export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  /** Omitted for client work with no public link. */
  url?: string;
  /** Omitted when there is no screenshot we're allowed to show; a typographic cover is drawn instead. */
  image?: string;
  tags: string[];
  stack: string[];
  role: string;
  year: number;
  featured?: boolean;
  caseStudy?: CaseStudy;
}

/**
 * Written write-up for client work that can't be demoed. No client names,
 * client code, or product screenshots go in here — only what I built and how.
 */
export interface CaseStudy {
  /** Where the work happened, e.g. "Client work · Bles Software". */
  context: string;
  /** What I owned, one clause each. */
  contributions: string[];
  problem?: string;
  /** The hard calls and why they went the way they did. */
  decisions?: { title: string; body: string }[];
  outcome?: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isActive: boolean;
  technologies?: string[];
}

export interface NavItem {
  /** Href used for no-JS / cross-page navigation, e.g. "/#about". */
  path: string;
  /** DOM id of the section this item scrolls to on the single page. */
  sectionId: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: "github" | "twitter" | "instagram" | "linkedin";
}

export interface Skill {
  name: string;
  category: "ai" | "frontend" | "backend" | "databases" | "devops" | "trading" | "testing" | "languages";
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

/* ------------------------------------------------------------------ */
/*  Algorithmic trading                                                */
/* ------------------------------------------------------------------ */

export type StrategyPlatform = "MetaTrader 5" | "TradingView";

/**
 * Headline backtest metrics. Deliberately identical across every strategy so
 * the cards stay comparable — a missing field renders as "—", never as zero.
 */
export interface StrategyMetrics {
  netProfitPct: number;
  profitFactor: number;
  maxDrawdownPct: number;
  winRatePct: number;
  totalTrades: number;
  expectancyUSD?: number;
  sharpe?: number;
  recoveryFactor?: number;
  avgRMultiple?: number;
}

/**
 * The conditions the numbers were produced under. Rendered next to every
 * metric block — results without their test conditions are not proof.
 */
export interface BacktestConditions {
  periodStart: string;
  periodEnd: string;
  initialDeposit: string;
  riskPerTrade: string;
  modellingQuality?: string;
  spread?: string;
  broker?: string;
}

export interface EquityPoint {
  /** ISO date of the closed trade this point settles on. */
  t: string;
  balance: number;
  /**
   * Only meaningful for strategies that hold more than one position at a time.
   * With a single position, equity at every close equals balance, so this is
   * left undefined rather than duplicating the balance series.
   */
  equity?: number;
}

export interface Trade {
  id: string;
  openTime: string;
  closeTime: string;
  side: "buy" | "sell";
  lots: number;
  entry: number;
  exit: number;
  pnl: number;
  rMultiple?: number;
}

/**
 * The trimmed shape the grid cards need. The full Strategy carries the whole
 * trade journal, which must not be shipped to the client just to draw a
 * sparkline — the home page passes this instead.
 */
export interface StrategyCardData {
  id: string;
  slug: string;
  name: string;
  platform: StrategyPlatform;
  symbol: string;
  timeframe: string;
  tagline: string;
  /** Downsampled balance series, enough to draw the card sparkline. */
  sparkline: number[];
  headline: Pick<
    StrategyMetrics,
    "netProfitPct" | "profitFactor" | "maxDrawdownPct"
  > | null;
}

export interface Strategy {
  id: string;
  slug: string;
  name: string;
  platform: StrategyPlatform;
  language: "MQL5" | "Pine Script";
  symbol: string;
  timeframe: string;
  /** One line for the card. */
  tagline: string;
  /** The short strategy note — 2-4 sentences, plain English. */
  note: string;
  /** Entry / exit / stop / filter mechanics, one clause each. */
  mechanics: { label: string; value: string }[];
  sourceUrl: string;
  sourceLabel: string;
  /** null until a real report has been parsed in — never stub these. */
  metrics: StrategyMetrics | null;
  conditions: BacktestConditions | null;
  equityCurve: EquityPoint[];
  trades: Trade[];
  /** Unretouched platform report screenshots, under /public/strategies/<slug>/. */
  reportImages?: string[];
  /** Full report for download (.htm / .pdf / .csv). */
  reportFile?: string;
  /**
   * Strategy-specific disclosures that a reader needs in order to read the
   * metrics correctly — e.g. a risk setting that did not bind in the test.
   * Rendered next to the generic backtest disclaimer.
   */
  caveats?: string[];
  /**
   * Why equityCurve/trades are empty when they are. Some platforms do not
   * export per-trade data, and "report not yet imported" would be a lie.
   */
  emptyDataNote?: string;
  /** false = backtest only. Drives the disclosure line; never default to true. */
  isLive: boolean;
  year: number;
  featured?: boolean;
}
