import { AlertTriangle, Info } from "lucide-react";
import type { BacktestConditions, StrategyMetrics } from "@/types";

const DASH = "—";

const pct = (v?: number) => (v === undefined ? DASH : `${v.toFixed(2)}%`);
const num = (v?: number, dp = 2) => (v === undefined ? DASH : v.toFixed(dp));

interface MetricsGridProps {
  metrics: StrategyMetrics | null;
  conditions: BacktestConditions | null;
  isLive: boolean;
  /** Strategy-specific disclosures needed to read the metrics correctly. */
  caveats?: string[];
}

/**
 * The same metric set for every strategy so cards stay comparable, with the
 * test conditions and a backtest disclosure directly beneath. Numbers without
 * their conditions are not evidence, so the two always render together.
 */
export function MetricsGrid({ metrics, conditions, isLive, caveats }: MetricsGridProps) {
  if (!metrics) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Performance metrics appear here once the backtest report is imported.
        </p>
      </div>
    );
  }

  const cells: { label: string; value: string; emphasis?: boolean }[] = [
    { label: "Net return", value: pct(metrics.netProfitPct), emphasis: true },
    { label: "Profit factor", value: num(metrics.profitFactor), emphasis: true },
    { label: "Max drawdown", value: pct(metrics.maxDrawdownPct), emphasis: true },
    { label: "Win rate", value: pct(metrics.winRatePct) },
    { label: "Total trades", value: String(metrics.totalTrades) },
    { label: "Expectancy", value: metrics.expectancyUSD === undefined ? DASH : `$${metrics.expectancyUSD.toFixed(2)}` },
    { label: "Sharpe", value: num(metrics.sharpe) },
    { label: "Recovery factor", value: num(metrics.recoveryFactor) },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
        {cells.map((c) => (
          <div key={c.label} className="bg-card px-4 py-4">
            <dt className="mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              {c.label}
            </dt>
            <dd
              className={
                c.emphasis
                  ? "font-mono text-xl font-semibold tabular-nums text-foreground"
                  : "font-mono text-base tabular-nums text-foreground"
              }
            >
              {c.value}
            </dd>
          </div>
        ))}
      </dl>

      {conditions && (
        <div className="rounded-lg border border-border bg-card/50 px-4 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            Test conditions
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
            <Condition label="Period" value={`${conditions.periodStart} → ${conditions.periodEnd}`} />
            <Condition label="Initial deposit" value={conditions.initialDeposit} />
            <Condition label="Risk per trade" value={conditions.riskPerTrade} />
            {conditions.modellingQuality && (
              <Condition label="Modelling" value={conditions.modellingQuality} />
            )}
            {conditions.spread && <Condition label="Spread" value={conditions.spread} />}
            {conditions.broker && <Condition label="Broker / server" value={conditions.broker} />}
          </dl>
        </div>
      )}

      {caveats && caveats.length > 0 && (
        <div className="rounded-lg border border-border bg-card px-4 py-4">
          <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            How to read these numbers
          </p>
          <ul className="space-y-2.5">
            {caveats.map((c) => (
              <li
                key={c}
                className="border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>
          {isLive
            ? "Figures include forward-tested results on a live account. Past performance does not guarantee future results."
            : "These are historical backtest results, not live trading returns. Backtests exclude slippage variance, requote behaviour, and swap changes that a live account would experience. Past performance does not guarantee future results."}
        </span>
      </p>
    </div>
  );
}

function Condition({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}
