import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EquityCurve } from "@/components/trading/EquityCurve";
import { MetricsGrid } from "@/components/trading/MetricsGrid";
import { TradeTable } from "@/components/trading/TradeTable";
import { ArticleReveal } from "@/components/layout/ArticleReveal";
import { CaseStudyRail } from "@/components/layout/CaseStudyRail";
import type { RailItem } from "@/components/layout/RailLines";
import { STRATEGIES } from "@/data/strategies";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STRATEGIES.map((strategy) => ({ slug: strategy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const strategy = STRATEGIES.find((s) => s.slug === slug);
  if (!strategy) return { title: "Strategy Not Found" };

  return {
    title: `${strategy.name} — ${strategy.platform}`,
    description: strategy.tagline,
  };
}

/** "$10,000" -> 10000, so the chart can draw the starting-deposit reference. */
function parseDeposit(value?: string): number | undefined {
  if (!value) return undefined;
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default async function StrategyPage({ params }: Props) {
  const { slug } = await params;
  const strategy = STRATEGIES.find((s) => s.slug === slug);
  if (!strategy) notFound();

  const i = STRATEGIES.findIndex((s) => s.slug === slug);
  const next = STRATEGIES[(i + 1) % STRATEGIES.length];
  const prev = STRATEGIES[(i - 1 + STRATEGIES.length) % STRATEGIES.length];

  const baseline = parseDeposit(strategy.conditions?.initialDeposit);

  // Section map for the case-study rail — only the sections actually rendered.
  const railItems: RailItem[] = [
    { id: "overview", label: "Overview" },
    ...(strategy.mechanics.length > 0
      ? [{ id: "mechanics", label: "How it trades" }]
      : []),
    { id: "performance", label: "Performance" },
    { id: "equity", label: "Equity curve" },
    { id: "journal", label: "Journal" },
  ];

  return (
    <article className="py-[var(--section-gap)]" data-animate="entrance">
      <ArticleReveal />
      <CaseStudyRail items={railItems} />
      <Container size="lg">
        <Link
          href="/#trading"
          className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          data-animate="entrance"
        >
          <ArrowLeft className="h-4 w-4" />
          All strategies
        </Link>

        {/* Header */}
        <header id="overview" className="mb-12 scroll-mt-24" data-animate="entrance">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              {strategy.platform}
            </span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              {strategy.language}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {strategy.symbol} · {strategy.timeframe}
            </span>
          </div>

          <h1
            className="text-h1 mb-4"
            style={{ viewTransitionName: `strategy-title-${slug}` }}
          >
            {strategy.name}
          </h1>

          {strategy.note ? (
            <p className="max-w-3xl leading-relaxed text-muted-foreground">{strategy.note}</p>
          ) : (
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              {strategy.tagline}
            </p>
          )}

          {strategy.sourceUrl && (
            <a
              href={strategy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              <span className="font-mono">{strategy.sourceLabel}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </header>

        {/* How it trades */}
        {strategy.mechanics.length > 0 && (
          <section id="mechanics" className="mb-12 scroll-mt-24" data-animate="entrance">
            <h2 className="text-h3 mb-5">How it trades</h2>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
              {strategy.mechanics.map((m) => (
                <div key={m.label} className="bg-card px-4 py-3.5">
                  <dt className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="text-sm leading-relaxed">{m.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Performance */}
        <section id="performance" className="mb-12 scroll-mt-24" data-animate="entrance">
          <h2 className="text-h3 mb-5">Performance</h2>
          <MetricsGrid
            metrics={strategy.metrics}
            conditions={strategy.conditions}
            isLive={strategy.isLive}
            caveats={strategy.caveats}
          />
        </section>

        {/* Equity curve */}
        <section id="equity" className="mb-12 scroll-mt-24" data-animate="entrance">
          <h2 className="text-h3 mb-1">Equity curve</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Account balance and drawdown across every closed trade.
          </p>

          {strategy.equityCurve.length >= 2 ? (
            <div className="rounded-lg border border-border bg-card p-5">
              <EquityCurve points={strategy.equityCurve} baseline={baseline} />
            </div>
          ) : (
            !strategy.reportImages?.length && (
              <EquityCurve
                points={strategy.equityCurve}
                emptyMessage={strategy.emptyDataNote}
              />
            )
          )}

          {strategy.reportImages?.map((src) => (
            <figure key={src} className="mt-6">
              <div className="relative overflow-hidden rounded-lg border border-border">
                <Image
                  src={src}
                  alt={`Unmodified ${strategy.platform} strategy report for ${strategy.name}`}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                  sizes="100vw"
                />
              </div>
            </figure>
          ))}

          {strategy.reportImages?.length ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Unretouched {strategy.platform} report &mdash; the source of the figures above.
              {strategy.emptyDataNote ? ` ${strategy.emptyDataNote}` : ""}
            </p>
          ) : null}
        </section>

        {/* Journal */}
        <section id="journal" className="mb-12 scroll-mt-24" data-animate="entrance">
          <h2 className="text-h3 mb-1">Trade journal</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Every closed position from the test, in order.
          </p>
          <TradeTable
            trades={strategy.trades}
            reportFile={strategy.reportFile}
            emptyMessage={strategy.emptyDataNote}
          />
        </section>

        {/* Navigation */}
        <div
          className="flex items-center justify-between border-t border-border pt-8"
          data-animate="entrance"
        >
          <Link
            href={`/strategies/${prev.slug}`}
            className="focus-ring text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            &larr; {prev.name}
          </Link>
          <Link
            href={`/strategies/${next.slug}`}
            className="focus-ring text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {next.name} &rarr;
          </Link>
        </div>
      </Container>
    </article>
  );
}
