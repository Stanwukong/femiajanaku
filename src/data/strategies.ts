import type { Strategy, StrategyCardData } from "@/types";
import ceResults from "./strategy-results/ce-strategy-v3.json";
import scalperResults from "./strategy-results/gold-ema-cross-scalper.json";

/**
 * Algorithmic trading strategies.
 *
 * MetaTrader results are never hand-written. Each results file is produced by
 *
 *   node scripts/parse-mt5-report.mjs <report.htm> <slug>
 *
 * from the platform's own "Save as Report" export, and spread in below.
 *
 * The TradingView entry is the exception: its Strategy Tester exports no
 * machine-readable report, so those metrics are transcribed by hand from the
 * published screenshots in public/strategies/cme-gap-fill/ — every figure
 * on the page is checkable against them.
 */

const SOURCE_REPO = "https://github.com/stanwukong/trading-strategies";

export const STRATEGIES: Strategy[] = [
  {
    id: "ce-strategy-v3",
    slug: "ce-strategy-v3",
    name: "Chandelier Exit Strategy v3.1",
    platform: "MetaTrader 5",
    language: "MQL5",
    symbol: "XAUUSD",
    timeframe: "M5 · H1 trend filter",
    tagline:
      "Volatility-adaptive trend following on gold — ATR-anchored stops, a higher-timeframe trend gate, and a 2R target.",
    note:
      "A trend-following system built on the Chandelier Exit — an ATR-anchored trailing level that flips direction when price closes through it. The flip is the entry signal, gated by an H1 50-EMA bias so the M5 engine only trades with the higher-timeframe trend. Stops sit 1.5×ATR from entry, targets at a fixed 2R, with a break-even move at 1R and a 2×ATR trailing stop behind the position; an opposite Chandelier flip closes early. Signals are evaluated on the closed bar and filled at the next bar's open, so the backtest carries no look-ahead. Ported 1:1 from a Pine v3 original.",
    mechanics: [
      { label: "Signal", value: "Chandelier Exit direction flip — ATR 21, multiplier 3.0, close-based extremums" },
      { label: "Trend filter", value: "Price on the correct side of the H1 50 EMA" },
      { label: "Stop", value: "1.5 × ATR from entry" },
      { label: "Target", value: "Fixed 2R, plus an early exit on the opposite Chandelier flip" },
      { label: "Break-even", value: "Stop moves to entry once the trade reaches 1R" },
      { label: "Trailing stop", value: "2 × ATR(14) behind the position once running" },
      { label: "Sizing", value: "Fixed-fractional, 1% of equity per trade — see the caveat below" },
      { label: "Execution", value: "Evaluated on the closed bar, filled at the next bar open (no intrabar repaint)" },
      { label: "Filters held off", value: "The ADX and ATR-percentile gates exist in the code but were disabled for this run" },
      { label: "Positions", value: "One at a time — the EA flips rather than stacking" },
    ],
    sourceUrl: `${SOURCE_REPO}/blob/main/mt5/CE_Strategy_v3_1.mq5`,
    sourceLabel: "CE_Strategy_v3_1.mq5",
    metrics: ceResults.metrics,
    conditions: ceResults.conditions,
    equityCurve: ceResults.equityCurve,
    trades: ceResults.trades as Strategy["trades"],
    reportImages: ["/strategies/ce-strategy-v3/CE-Stable_v1.png"],
    reportFile: "/strategies/ce-strategy-v3/mt5-report.html",
    caveats: [
      "The 1% risk setting never bound. On a $100 deposit a 1%-risk position sizes below the broker's 0.01 lot minimum, so all 603 trades were floored at the minimum lot — risking a median of $8.59, or about 8.6% of the starting deposit, and $38.76 on the worst loss. The +206% headline reflects a heavily over-leveraged micro-account, not the configured risk model.",
      "Normalised, the same 603-trade sequence is worth +32.1R. Compounded at the intended 1% risk it returns roughly +35%, not +206% — that is the figure to judge the edge on.",
      "A 1.11 profit factor is thin: $2,040 of gross profit against $1,834 of gross loss. The edge is real but small, and a 44.6% peak-to-trough drawdown along the way is not a risk profile most accounts would tolerate.",
    ],
    isLive: false,
    year: 2026,
    featured: true,
  },
  {
    id: "gold-ema-cross-scalper",
    slug: "gold-ema-cross-scalper",
    name: "Gold EMA Cross Scalper",
    platform: "MetaTrader 5",
    language: "MQL5",
    symbol: "XAUUSD",
    timeframe: "M5 · 100 EMA trend filter",
    tagline:
      "A 9/21 EMA trend-continuation system on M5 gold — swing-structure stops, no take profit, and an economic-calendar blackout.",
    note:
      "The 9 EMA crossing the 21 EMA fires the trade, but only when the entire crossover candle sits beyond the 100 EMA, which keeps the system from fading the dominant trend. Stops go $10 beyond the most recent swing rather than a fixed distance, so risk adapts to the structure actually in front of the trade — and any signal whose stop falls outside a $5–$100 band is rejected rather than taken at bad size. There is no take profit: positions run until the opposite 9/21 cross, with the stop pulled to break-even once the trade reaches 1R. That exit is what gives the results their shape — only 27% of trades win, but the average winner is about three times the average loser. The EA reads the MT5 economic calendar directly and refuses to enter within 15 minutes either side of high-impact USD news, which is where gold systems usually give back the month.",
    mechanics: [
      { label: "Signal", value: "9 EMA crosses 21 EMA, confirmed on the closed candle, filled at the next bar open" },
      { label: "Trend filter", value: "The whole crossover candle must sit beyond the 100 EMA" },
      { label: "Stop", value: "$10 beyond the swing high/low from a 10-bar lookback" },
      { label: "Stop sanity gate", value: "Signal rejected if the resulting stop is under $5 or over $100" },
      { label: "Target", value: "None — take profit disabled; the position runs to the opposite 9/21 cross" },
      { label: "Break-even", value: "Stop moves to entry once the trade reaches 1R" },
      { label: "News filter", value: "MT5 calendar — no entries ±15 min around high-impact USD events" },
      { label: "Spread gate", value: "No entry above a $1.00 spread" },
      { label: "Sizing", value: "2% of balance risked per trade, capped at 2.00 lots, one position at a time" },
      { label: "Filters held off", value: "The 08:00–20:00 session gate exists in the code but was disabled for this run" },
    ],
    sourceUrl: `${SOURCE_REPO}/blob/main/mt5/GoldEmaCrossScalper.mq5`,
    sourceLabel: "GoldEmaCrossScalper.mq5",
    metrics: scalperResults.metrics,
    conditions: scalperResults.conditions,
    equityCurve: scalperResults.equityCurve,
    trades: scalperResults.trades as Strategy["trades"],
    reportImages: ["/strategies/gold-ema-cross-scalper/Scalper.png"],
    reportFile: "/strategies/gold-ema-cross-scalper/mt5-report.html",
    caveats: [
      "The risk model engaged as configured. On a $10,000 deposit a 2% risk resolves to real position sizes — lots ranged 0.02 to 0.21, none floored at the broker minimum or capped at the 2.00 lot ceiling — and realised risk came out at a median 1.89% of balance per trade. The +58% headline is a fair reflection of the risk that was actually taken.",
      "The edge is concentrated in a handful of trades. The three largest winners account for 85% of the $5,811 net profit, and stripping out the top five leaves the remaining 633 trades net negative. That is the expected shape of a let-winners-run system, but it means the result rests on catching a small number of large moves — a window that missed them would look very different. The 1.16 profit factor says the same thing: $42,953 of gross profit against $37,142 of gross loss.",
      "Only 27% of trades win, and the test ran through 14 consecutive losses at one point on the way to a 24.7% peak-to-trough drawdown in closed balance (28.1% on equity). A system with this distribution only works if every signal is taken; skipping trades after a losing run is how the winners get missed.",
      "The worst trade lost 3.4R, not the 1R the stop was sized for. A position held over the weekend of 16–18 January 2026 gapped through its stop and closed $630 down — 6.6% of the account at the time. Stops bound risk under normal conditions; they do not guarantee it across a weekend gap.",
    ],
    isLive: false,
    year: 2026,
    featured: true,
  },
  {
    id: "cme-gap-fill",
    slug: "cme-gap-fill",
    name: "CME Gap-Fill v4.4.1",
    platform: "TradingView",
    language: "Pine Script",
    // TODO(femi): confirm the chart timeframe this was tested on.
    symbol: "BTC futures",
    timeframe: "—",
    tagline:
      "Fades CME Bitcoin futures session gaps — waits for price to re-enter the gap before entering, then rides the fill on a trailing stop.",
    note:
      "When the CME session closes and Bitcoin keeps trading, the futures chart reopens away from its previous close, and those gaps have a well-documented tendency to fill. The strategy tracks up to five open gaps at once but does not trade one on sight: it waits for a later candle to print a wick back inside the gap zone, which is the evidence that the fill is actually underway, and only then enters in the direction of the fill — a gap up gets faded short, a gap down gets bought. There is no take profit. The position rides until the stop takes it out, with the stop pulled to break-even once price has covered half the gap and trailing 1% behind the best price from there. Gaps that go unconfirmed for four hours expire untraded, which is what keeps the system out of the gaps that were never going to close.",
    mechanics: [
      { label: "Gap source", value: "CME:BTC1! front-month Bitcoin futures, requested with lookahead disabled" },
      { label: "Gap definition", value: "Body-to-body — clear space between the previous and current candle bodies" },
      { label: "Minimum gap", value: "0.15% of price" },
      { label: "Confirmation", value: "A later candle must print a wick inside the gap zone" },
      { label: "Expiry", value: "Unconfirmed gaps are discarded after 4 hours; up to 5 tracked at once" },
      { label: "Direction", value: "Gap up → short, gap down → long" },
      { label: "Entry", value: "Market, on the close of the confirming candle" },
      { label: "Stop", value: "Distance sized so that being stopped out costs 1% of equity" },
      { label: "Target", value: "None — take profit disabled; the stop is the only exit" },
      { label: "Break-even & trail", value: "Stop to entry +0.1% at 50% of the gap covered, then trails 1% behind the best price" },
      { label: "Costs modelled", value: "0.04% commission per trade and 5 ticks of slippage" },
      { label: "Sizing", value: "Fixed 1 unit per trade — position size does not compound" },
    ],
    sourceUrl: `${SOURCE_REPO}/blob/main/tradingview/CME-Gap.pine`,
    sourceLabel: "CME-Gap.pine",
    metrics: {
      netProfitPct: 93.2,
      profitFactor: 3.3,
      maxDrawdownPct: 16.51,
      winRatePct: 36.05,
      totalTrades: 233,
      expectancyUSD: 40,
      recoveryFactor: 3.4,
    },
    conditions: {
      periodStart: "2025-01-01",
      periodEnd: "2026-08-28",
      initialDeposit: "$10,000",
      riskPerTrade: "1% of equity per trade",
      modellingQuality: "TradingView tester, orders on bar close",
      spread: "0.04% commission + 5 ticks slippage",
    },
    equityCurve: [],
    trades: [],
    reportImages: [
      "/strategies/cme-gap-fill/tv-key-stats.png",
      "/strategies/cme-gap-fill/tv-breakdown.png",
    ],
    emptyDataNote:
      "TradingView's Strategy Tester exports no per-trade journal or equity series on this plan, so the published report is the record rather than a reconstruction.",
    caveats: [
      "The gap source is a continuous contract, and that needs checking before the number is quoted anywhere. CME Bitcoin futures are monthly, and CME:BTC1! splices one contract to the next without back-adjusting, so every roll puts a price step into the series that was never a tradeable gap. Roll basis on Bitcoin futures regularly exceeds the 0.15% minimum gap, and roughly twenty rolls fall inside this test window. Some share of the 233 trades may be chasing splice artefacts rather than real gaps.",
      "The equity curve is not compounded. Position size is fixed at one unit per trade for the whole run, so +93.20% is the sum of fixed-size outcomes against the starting $10,000, not a compounding return. The stop distance, by contrast, is recalculated from live equity on every trade — so dollar risk per trade grows with the account while position size never does. The two halves of the risk model are on different footings, which is worth resolving deliberately rather than by default.",
      "The trailing stop is what makes the money, not the gap fill. The average winner is $159 against an average loser of $27, even though the initial stop is sized to lose about 1% of equity. Most losing trades are therefore being cut near break-even by the trail rather than stopped out in full. That is the edge — and it is also the dependency: the result assumes break-even and trailing stops fill at their levels, which on a 24/7 asset with five ticks of modelled slippage is optimistic during a fast move.",
      "In its favour, the result does not rest on a few lucky trades. TradingView attributes −$539 of P&L to outlier trades, meaning the outliers were net negative and the profit comes from the body of the distribution. Both directions are independently profitable (+$4,932 short, +$4,387 long) across 233 trades, and the plumbing is clean — both data requests disable lookahead, entries are gated on confirmed bars, and orders process on bar close, so there is no obvious forward-looking bias.",
    ],
    isLive: false,
    year: 2026,
    featured: true,
  },
];

export const getStrategy = (slug: string) =>
  STRATEGIES.find((s) => s.slug === slug);

/** Evenly sample at most `max` points — a card sparkline needs no more. */
function downsample(values: number[], max = 64): number[] {
  if (values.length <= max) return values;
  const step = (values.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => values[Math.round(i * step)]);
}

/**
 * Trim a strategy down to what the grid card renders. Called from the server
 * so the trade journal never reaches the client bundle.
 */
export function toCardData(s: Strategy): StrategyCardData {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    platform: s.platform,
    symbol: s.symbol,
    timeframe: s.timeframe,
    tagline: s.tagline,
    sparkline: downsample(s.equityCurve.map((p) => p.balance)),
    headline: s.metrics
      ? {
          netProfitPct: s.metrics.netProfitPct,
          profitFactor: s.metrics.profitFactor,
          maxDrawdownPct: s.metrics.maxDrawdownPct,
        }
      : null,
  };
}
