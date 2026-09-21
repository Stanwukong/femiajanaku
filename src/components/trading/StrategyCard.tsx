import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StrategyCardData } from "@/types";

/** Static, non-interactive preview of the balance curve for the card face. */
function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) {
    return (
      <div className="flex h-16 items-center justify-center rounded-md border border-dashed border-border">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          OPEN FOR SCREENSHOTS
        </span>
      </div>
    );
  }

  const w = 280;
  const h = 64;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i: number) => (i / (values.length - 1)) * w;
  const y = (v: number) => h - ((v - min) / span) * (h - 4) - 2;

  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `M0,${h} ${values.map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} L${w},${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-16 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--viz-balance)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--viz-balance)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <path
        d={d}
        fill="none"
        stroke="var(--viz-balance)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function HeadlineMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-mono text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export function StrategyCard({ strategy }: { strategy: StrategyCardData }) {
  const { headline } = strategy;

  return (
    <Link
      href={`/strategies/${strategy.slug}`}
      className={cn(
        "strategy-card group flex flex-col rounded-lg border border-border bg-card p-5",
        "transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          {strategy.platform}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {strategy.symbol} · {strategy.timeframe}
        </span>
        <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <h3
        className="mb-1.5 font-display text-lg font-semibold"
        style={{ viewTransitionName: `strategy-title-${strategy.slug}` }}
      >
        {strategy.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{strategy.tagline}</p>

      <div className="mt-auto">
        <Sparkline values={strategy.sparkline} />

        {headline ? (
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
            <HeadlineMetric label="Net return" value={`${headline.netProfitPct.toFixed(1)}%`} />
            <HeadlineMetric label="Profit factor" value={headline.profitFactor.toFixed(2)} />
            <HeadlineMetric label="Max DD" value={`${headline.maxDrawdownPct.toFixed(1)}%`} />
          </div>
        ) : (
          <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
            Backtest report pending import
          </p>
        )}
      </div>
    </Link>
  );
}
