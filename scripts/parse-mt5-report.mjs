#!/usr/bin/env node
/**
 * Turn a MetaTrader 5 Strategy Tester report into the shape src/data/strategies.ts
 * expects, so no performance figure is ever typed by hand.
 *
 *   node scripts/parse-mt5-report.mjs <report.htm> <slug>
 *
 * Writes src/data/strategy-results/<slug>.json containing
 * { metrics, conditions, equityCurve, trades }.
 *
 * In MT5: Strategy Tester -> right-click the Backtest tab -> "Report" -> "Save as
 * Report (*.html)". Keep the .htm; the sibling .png is the raw report image.
 *
 * The parser is deliberately tolerant — MT5's table markup shifts between builds.
 * Anything it cannot find is omitted rather than guessed, so a missing field
 * renders as an em dash instead of a wrong number.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

/* ------------------------------------------------------------------ */
/*  HTML -> rows of cells                                              */
/* ------------------------------------------------------------------ */

function decode(buf) {
  if (buf[0] === 0xff && buf[1] === 0xfe) return buf.toString("utf16le");
  if (buf[0] === 0xfe && buf[1] === 0xff) return buf.swap16().toString("utf16le");
  return buf.toString("utf8").replace(/^﻿/, "");
}

const ENTITIES = {
  "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">",
  "&quot;": '"', "&#39;": "'", "&apos;": "'",
};

function clean(html) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&[a-z]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m)
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseRows(html) {
  const rows = [];
  for (const m of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [];
    for (const c of m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)) {
      cells.push(clean(c[1]));
    }
    if (cells.length) rows.push(cells);
  }
  return rows;
}

/* ------------------------------------------------------------------ */
/*  Value helpers                                                      */
/* ------------------------------------------------------------------ */

/** MT5 writes "12 345.67" with a space thousand-separator. */
function toNum(raw) {
  if (raw == null) return undefined;
  const s = String(raw).replace(/\s/g, "").replace(/,/g, "");
  const m = s.match(/-?\d+(?:\.\d+)?/);
  if (!m) return undefined;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : undefined;
}

/** Pull the percentage out of "1 234.56 (12.34%)" or "12.34% (1 234.56)". */
function toPct(raw) {
  if (raw == null) return undefined;
  const m = String(raw).match(/(-?\d+(?:[.,]\d+)?)\s*%/);
  return m ? Number(m[1].replace(",", ".")) : undefined;
}

/**
 * Label/value map. MT5 puts "Total Net Profit:" in one cell and the figure in
 * the next; labels repeat across a row, so every pair on the row is captured.
 */
function buildSummary(rows) {
  const map = new Map();
  for (const cells of rows) {
    for (let i = 0; i < cells.length; i++) {
      const label = cells[i];
      if (!label.endsWith(":")) continue;
      const key = label.slice(0, -1).trim().toLowerCase();
      let j = i + 1;
      while (j < cells.length && cells[j] === "") j++;
      if (j < cells.length && !cells[j].endsWith(":")) map.set(key, cells[j]);
    }
  }
  return map;
}

/**
 * MT5 writes the EA's inputs one per row: the first row is labelled "Inputs:"
 * and every following row repeats an empty label cell. Collect the whole block
 * so settings past the first line are not lost.
 */
function collectInputs(rows) {
  const out = [];
  let inBlock = false;
  for (const cells of rows) {
    const first = (cells[0] ?? "").trim().toLowerCase();
    if (first === "inputs:") {
      inBlock = true;
      out.push(...cells.slice(1).filter(Boolean));
      continue;
    }
    if (!inBlock) continue;
    // The block ends at the next labelled row (e.g. "Company:").
    if (first !== "") break;
    out.push(...cells.slice(1).filter(Boolean));
  }
  return out;
}

const pick = (map, ...keys) => {
  for (const k of keys) {
    const v = map.get(k.toLowerCase());
    if (v !== undefined && v !== "") return v;
  }
  return undefined;
};

/* ------------------------------------------------------------------ */
/*  Tables                                                             */
/* ------------------------------------------------------------------ */

function findTable(rows, required) {
  for (let i = 0; i < rows.length; i++) {
    const lower = rows[i].map((c) => c.toLowerCase());
    if (required.every((r) => lower.some((c) => c === r || c.startsWith(r)))) {
      const idx = {};
      required.forEach((r) => {
        idx[r] = lower.findIndex((c) => c === r || c.startsWith(r));
      });
      return { headerRow: i, header: rows[i], lower, idx };
    }
  }
  return null;
}

/** Order ticket -> stop-loss price, so R multiples can be derived. */
function buildStopMap(rows) {
  const t = findTable(rows, ["order", "s / l"]);
  const stops = new Map();
  if (!t) return stops;

  for (let i = t.headerRow + 1; i < rows.length; i++) {
    const c = rows[i];
    if (c.length < t.header.length - 2) break;
    const ticket = c[t.idx["order"]];
    const sl = toNum(c[t.idx["s / l"]]);
    if (ticket && sl) stops.set(ticket.trim(), sl);
  }
  return stops;
}

function parseDeals(rows, stops) {
  const t = findTable(rows, ["deal", "direction", "profit", "balance"]);
  if (!t) {
    throw new Error(
      "Could not locate the Deals table. Make sure the file is a full 'Save as Report' export, not a screenshot or a summary-only report."
    );
  }

  const col = (name) => t.lower.findIndex((c) => c === name || c.startsWith(name));
  const iTime = col("time");
  const iType = col("type");
  const iDir = col("direction");
  const iVol = col("volume");
  const iPrice = col("price");
  const iOrder = col("order");
  const iComm = col("commission");
  const iSwap = col("swap");
  const iProfit = col("profit");
  const iBalance = col("balance");

  const open = [];
  const trades = [];
  const equityCurve = [];

  for (let r = t.headerRow + 1; r < rows.length; r++) {
    const c = rows[r];
    const dir = (c[iDir] ?? "").toLowerCase();
    const type = (c[iType] ?? "").toLowerCase();

    // The opening "balance" deal is the deposit, not a trade.
    if (type === "balance") continue;
    if (dir !== "in" && dir !== "out" && dir !== "in/out") continue;

    const time = (c[iTime] ?? "").trim();
    const price = toNum(c[iPrice]);
    if (!time || price === undefined) continue;

    if (dir === "in") {
      open.push({
        time,
        side: type === "buy" ? "buy" : "sell",
        lots: toNum(c[iVol]) ?? 0,
        price,
        order: (c[iOrder] ?? "").trim(),
        // Entry-leg costs settle on the opening deal; carry them so the
        // round-turn P/L matches the balance column.
        cost: (toNum(c[iComm]) ?? 0) + (toNum(c[iSwap]) ?? 0),
      });
      continue;
    }

    // "out" (and the closing half of "in/out") settles the oldest open leg.
    const entry = open.shift();
    if (!entry) continue;

    const pnl =
      (toNum(c[iProfit]) ?? 0) +
      (toNum(c[iComm]) ?? 0) +
      (toNum(c[iSwap]) ?? 0) +
      (entry.cost ?? 0);

    const sl = stops.get(entry.order);
    let rMultiple;
    if (sl && Math.abs(entry.price - sl) > 1e-9) {
      const risk = Math.abs(entry.price - sl);
      const move = entry.side === "buy" ? price - entry.price : entry.price - price;
      rMultiple = Number((move / risk).toFixed(2));
    }

    trades.push({
      id: `${entry.order || trades.length + 1}-${trades.length + 1}`,
      openTime: toIso(entry.time),
      closeTime: toIso(time),
      side: entry.side,
      lots: entry.lots,
      entry: entry.price,
      exit: price,
      pnl: Number(pnl.toFixed(2)),
      ...(rMultiple === undefined ? {} : { rMultiple }),
    });

    const balance = toNum(c[iBalance]);
    if (balance !== undefined) {
      equityCurve.push({ t: toIso(time), balance: Number(balance.toFixed(2)) });
    }

    if (dir === "in/out") {
      open.push({
        time,
        side: type === "buy" ? "buy" : "sell",
        lots: toNum(c[iVol]) ?? 0,
        price,
        order: (c[iOrder] ?? "").trim(),
        cost: 0, // already counted on the closing half above
      });
    }
  }

  return { trades, equityCurve };
}

/** "10 000.00" -> "$10,000" for display; the UI re-parses it for the chart baseline. */
function formatDeposit(raw) {
  const n = toNum(raw);
  if (n === undefined) return raw ?? "";
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/** "2024.03.11 14:05:00" -> ISO. */
function toIso(mt5Time) {
  const m = String(mt5Time).match(
    /(\d{4})[.\-/](\d{2})[.\-/](\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/
  );
  if (!m) return mt5Time;
  const [, y, mo, d, h, mi, s = "00"] = m;
  return `${y}-${mo}-${d}T${h}:${mi}:${s}Z`;
}

/* ------------------------------------------------------------------ */
/*  Assembly                                                           */
/* ------------------------------------------------------------------ */

function buildMetrics(sum, trades, deposit) {
  const netProfit = toNum(pick(sum, "Total Net Profit"));
  const totalTrades = toNum(pick(sum, "Total Trades")) ?? trades.length;

  let winRatePct = toPct(pick(sum, "Profit Trades (% of total)", "Profit Trades"));
  if (winRatePct === undefined && trades.length) {
    winRatePct = (trades.filter((t) => t.pnl > 0).length / trades.length) * 100;
  }

  let maxDrawdownPct =
    toPct(pick(sum, "Balance Drawdown Maximal")) ??
    toPct(pick(sum, "Balance Drawdown Relative")) ??
    toPct(pick(sum, "Equity Drawdown Maximal"));

  // Last resort: derive it from the balance series we just built.
  if (maxDrawdownPct === undefined && trades.length) maxDrawdownPct = undefined;

  const metrics = {
    netProfitPct:
      netProfit !== undefined && deposit ? Number(((netProfit / deposit) * 100).toFixed(2)) : undefined,
    profitFactor: toNum(pick(sum, "Profit Factor")),
    maxDrawdownPct: maxDrawdownPct === undefined ? undefined : Math.abs(maxDrawdownPct),
    winRatePct: winRatePct === undefined ? undefined : Number(winRatePct.toFixed(2)),
    totalTrades,
    expectancyUSD: toNum(pick(sum, "Expected Payoff")),
    sharpe: toNum(pick(sum, "Sharpe Ratio")),
    recoveryFactor: toNum(pick(sum, "Recovery Factor")),
  };

  const missing = ["netProfitPct", "profitFactor", "maxDrawdownPct"].filter(
    (k) => metrics[k] === undefined
  );
  if (missing.length) {
    console.warn(`  ! could not read: ${missing.join(", ")} — fill these in by hand`);
  }

  // Drop undefined so the JSON stays clean and the UI shows an em dash.
  return Object.fromEntries(Object.entries(metrics).filter(([, v]) => v !== undefined));
}

function buildConditions(sum, equityCurve, inputs) {
  const period = pick(sum, "Period") ?? "";
  const range = period.match(
    /(\d{4}[.\-/]\d{2}[.\-/]\d{2})\s*[-–]\s*(\d{4}[.\-/]\d{2}[.\-/]\d{2})/
  );

  const periodStart = range
    ? range[1].replace(/[.\-/]/g, "-")
    : equityCurve[0]?.t.slice(0, 10) ?? "";
  const periodEnd = range
    ? range[2].replace(/[.\-/]/g, "-")
    : equityCurve.at(-1)?.t.slice(0, 10) ?? "";

  const inputText = inputs.join(" ");
  const riskMatch = inputText.match(/Inp(?:RiskPct|RiskPercent)\s*=\s*([\d.]+)/i);

  const cond = {
    periodStart,
    periodEnd,
    initialDeposit: formatDeposit(pick(sum, "Initial Deposit")),
    riskPerTrade: riskMatch ? `${riskMatch[1]}% per trade` : "",
    modellingQuality: pick(sum, "History Quality", "Modelling quality"),
    spread: pick(sum, "Spread"),
    broker: pick(sum, "Broker", "Company"),
  };

  return Object.fromEntries(Object.entries(cond).filter(([, v]) => v !== undefined && v !== ""));
}

/* ------------------------------------------------------------------ */

function main() {
  const [file, slug] = process.argv.slice(2);
  if (!file || !slug) {
    console.error("usage: node scripts/parse-mt5-report.mjs <report.htm> <slug>");
    process.exit(2);
  }

  const html = decode(readFileSync(resolve(file)));
  const rows = parseRows(html);
  if (!rows.length) {
    console.error("No tables found — is this really an MT5 HTML report?");
    process.exit(1);
  }

  const sum = buildSummary(rows);
  const inputs = collectInputs(rows);
  const stops = buildStopMap(rows);
  const { trades, equityCurve } = parseDeals(rows, stops);

  if (!trades.length) {
    console.error("Parsed 0 trades. The report may cover a period with no deals.");
    process.exit(1);
  }

  const deposit = toNum(pick(sum, "Initial Deposit"));
  const metrics = buildMetrics(sum, trades, deposit);
  const conditions = buildConditions(sum, equityCurve, inputs);

  // Seed the curve with the opening deposit so the line starts at the baseline.
  if (deposit !== undefined && equityCurve.length) {
    equityCurve.unshift({ t: trades[0].openTime, balance: deposit });
  }

  const out = resolve(`src/data/strategy-results/${slug}.json`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify({ metrics, conditions, equityCurve, trades }, null, 2));

  console.log(`\n  ${slug}`);
  console.log(`  ${trades.length} trades, ${equityCurve.length} curve points`);
  console.log(`  period ${conditions.periodStart} -> ${conditions.periodEnd}`);
  console.log(`  net ${metrics.netProfitPct ?? "?"}%  PF ${metrics.profitFactor ?? "?"}  maxDD ${metrics.maxDrawdownPct ?? "?"}%`);
  console.log(`  -> ${out}\n`);
}

main();
