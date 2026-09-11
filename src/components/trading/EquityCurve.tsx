"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EquityPoint } from "@/types";

interface EquityCurveProps {
  points: EquityPoint[];
  /** Starting deposit — drawn as a dashed reference line. */
  baseline?: number;
  /** Currency prefix for axis + tooltip figures. */
  currency?: string;
  /** Shown instead of the chart when there is no series to draw. */
  emptyMessage?: string;
}

const M = { top: 16, right: 16, bottom: 26, left: 58 };
const BALANCE_H = 232;
const GAP = 34;
const DD_H = 76;

const fmtMoney = (v: number, currency: string) =>
  `${currency}${Math.round(v).toLocaleString("en-US")}`;

const fmtAxis = (v: number, currency: string) =>
  Math.abs(v) >= 10000
    ? `${currency}${(v / 1000).toFixed(1)}k`
    : `${currency}${Math.round(v).toLocaleString("en-US")}`;

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

/**
 * Balance curve with a drawdown panel beneath it.
 *
 * Deliberately two stacked panels sharing one x-axis rather than one chart with
 * two y-scales: money and percent-from-peak are different units, and a dual
 * axis would let the visual relationship between them be set by scale choice.
 * Drawdown is derived from the running peak of the balance series, so it needs
 * no extra data.
 */
export function EquityCurve({ points, baseline, currency = "$", emptyMessage }: EquityCurveProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [hover, setHover] = useState<number | null>(null);

  const height = M.top + BALANCE_H + GAP + DD_H + M.bottom;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.max(320, entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geom = useMemo(() => {
    if (points.length < 2) return null;

    const innerW = width - M.left - M.right;

    // Drawdown from the running peak, in percent.
    let peak = points[0].balance;
    const dd = points.map((p) => {
      peak = Math.max(peak, p.balance);
      return peak > 0 ? ((p.balance - peak) / peak) * 100 : 0;
    });
    const maxDD = Math.min(...dd, 0);

    const values = points.map((p) => p.balance);
    if (baseline !== undefined) values.push(baseline);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const pad = (rawMax - rawMin) * 0.08 || Math.abs(rawMax) * 0.08 || 1;
    const min = rawMin - pad;
    const max = rawMax + pad;

    const x = (i: number) => M.left + (i / (points.length - 1)) * innerW;
    const yBal = (v: number) => M.top + (1 - (v - min) / (max - min)) * BALANCE_H;

    const ddTop = M.top + BALANCE_H + GAP;
    const ddFloor = Math.min(maxDD, -1);
    const yDd = (v: number) => ddTop + (v / ddFloor) * DD_H;

    const balLine = points
      .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${yBal(p.balance).toFixed(2)}`)
      .join(" ");

    const balArea =
      `M${x(0).toFixed(2)},${(M.top + BALANCE_H).toFixed(2)} ` +
      points.map((p, i) => `L${x(i).toFixed(2)},${yBal(p.balance).toFixed(2)}`).join(" ") +
      ` L${x(points.length - 1).toFixed(2)},${(M.top + BALANCE_H).toFixed(2)} Z`;

    const ddArea =
      `M${x(0).toFixed(2)},${ddTop.toFixed(2)} ` +
      dd.map((v, i) => `L${x(i).toFixed(2)},${yDd(v).toFixed(2)}`).join(" ") +
      ` L${x(points.length - 1).toFixed(2)},${ddTop.toFixed(2)} Z`;

    const ticks = Array.from({ length: 5 }, (_, i) => min + ((max - min) * i) / 4);

    const tickCount = Math.min(5, points.length);
    const xTickIdx = Array.from(
      new Set(
        Array.from({ length: tickCount }, (_, i) =>
          Math.round((i / Math.max(1, tickCount - 1)) * (points.length - 1))
        )
      )
    );

    return {
      innerW, x, yBal, yDd, balLine, balArea, ddArea, ticks, xTickIdx, dd, ddTop, ddFloor, maxDD,
    };
  }, [points, width, baseline]);

  if (!geom) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          {emptyMessage ?? "Equity curve appears here once the backtest report is imported."}
        </p>
      </div>
    );
  }

  const {
    innerW, x, yBal, yDd, balLine, balArea, ddArea, ticks, xTickIdx, dd, ddTop, ddFloor, maxDD,
  } = geom;

  const last = points[points.length - 1];
  const active = hover !== null ? points[hover] : null;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    const i = Math.round(((px - M.left) / innerW) * (points.length - 1));
    setHover(Math.min(points.length - 1, Math.max(0, i)));
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Account balance and drawdown across ${points.length} closed trades. Ending balance ${fmtMoney(last.balance, currency)}, maximum drawdown ${Math.abs(maxDD).toFixed(1)} percent.`}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        className="overflow-visible"
      >
        {/* ---------- Balance panel ---------- */}
        <text
          x={M.left}
          y={M.top - 4}
          className="fill-muted-foreground text-[10px] uppercase tracking-widest"
        >
          Balance
        </text>

        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={M.left}
              y1={yBal(t)}
              x2={M.left + innerW}
              y2={yBal(t)}
              stroke="var(--viz-grid)"
              strokeWidth="1"
            />
            <text
              x={M.left - 10}
              y={yBal(t)}
              dy="0.32em"
              textAnchor="end"
              className="fill-muted-foreground font-mono text-[10px]"
            >
              {fmtAxis(t, currency)}
            </text>
          </g>
        ))}

        {baseline !== undefined && (
          <>
            <line
              x1={M.left}
              y1={yBal(baseline)}
              x2={M.left + innerW}
              y2={yBal(baseline)}
              stroke="var(--viz-baseline)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            <text
              x={M.left + 6}
              y={yBal(baseline) - 5}
              className="fill-muted-foreground font-mono text-[9px]"
            >
              start
            </text>
          </>
        )}

        <defs>
          <linearGradient id="eq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--viz-balance)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--viz-balance)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={balArea} fill="url(#eq-fill)" />
        <path
          d={balLine}
          fill="none"
          stroke="var(--viz-balance)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Direct label on the final value */}
        <text
          x={M.left + innerW}
          y={yBal(last.balance) - 9}
          textAnchor="end"
          className="fill-foreground font-mono text-[11px] font-semibold"
        >
          {fmtMoney(last.balance, currency)}
        </text>

        {/* ---------- Drawdown panel ---------- */}
        <text
          x={M.left}
          y={ddTop - 8}
          className="fill-muted-foreground text-[10px] uppercase tracking-widest"
        >
          Drawdown from peak
        </text>

        <line
          x1={M.left}
          y1={ddTop}
          x2={M.left + innerW}
          y2={ddTop}
          stroke="var(--viz-grid)"
          strokeWidth="1"
        />
        <text
          x={M.left - 10}
          y={ddTop}
          dy="0.32em"
          textAnchor="end"
          className="fill-muted-foreground font-mono text-[10px]"
        >
          0%
        </text>
        <text
          x={M.left - 10}
          y={ddTop + DD_H}
          dy="0.32em"
          textAnchor="end"
          className="fill-muted-foreground font-mono text-[10px]"
        >
          {ddFloor.toFixed(1)}%
        </text>

        <path d={ddArea} fill="var(--viz-drawdown)" fillOpacity="0.28" />
        <path
          d={dd
            .map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${yDd(v).toFixed(2)}`)
            .join(" ")}
          fill="none"
          stroke="var(--viz-drawdown)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* X date labels */}
        {xTickIdx.map((i) => (
          <text
            key={i}
            x={x(i)}
            y={height - 8}
            textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
            className="fill-muted-foreground font-mono text-[10px]"
          >
            {new Date(points[i].t).toLocaleDateString("en-GB", {
              month: "short",
              year: "2-digit",
            })}
          </text>
        ))}

        {/* Crosshair spans both panels */}
        {active && hover !== null && (
          <g pointerEvents="none">
            <line
              x1={x(hover)}
              y1={M.top}
              x2={x(hover)}
              y2={ddTop + DD_H}
              stroke="var(--viz-baseline)"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx={x(hover)}
              cy={yBal(active.balance)}
              r="5"
              fill="var(--viz-balance)"
              stroke="hsl(var(--card))"
              strokeWidth="2"
            />
            <circle
              cx={x(hover)}
              cy={yDd(dd[hover])}
              r="4"
              fill="var(--viz-drawdown)"
              stroke="hsl(var(--card))"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {active && hover !== null && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-border bg-card px-3 py-2 shadow-lg"
          style={{
            left: `${Math.min(Math.max((x(hover) / width) * 100, 6), 74)}%`,
            top: 4,
          }}
        >
          <p className="mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            Trade {hover + 1} · {fmtDate(active.t)}
          </p>
          <TooltipRow
            color="var(--viz-balance)"
            label="Balance"
            value={fmtMoney(active.balance, currency)}
          />
          <TooltipRow
            color="var(--viz-drawdown)"
            label="Drawdown"
            value={`${dd[hover].toFixed(2)}%`}
          />
        </div>
      )}
    </div>
  );
}

function TooltipRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto font-mono font-medium text-foreground">{value}</span>
    </div>
  );
}
