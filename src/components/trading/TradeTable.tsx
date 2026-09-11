"use client";

import { useState } from "react";
import type { Trade } from "@/types";

const PAGE = 25;

const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
};

const fmtPnl = (v: number) => `${v >= 0 ? "+" : "−"}$${Math.abs(v).toFixed(2)}`;

interface TradeTableProps {
  trades: Trade[];
  /** Full report for download, if one has been published. */
  reportFile?: string;
  /** Shown instead of the table when there is no journal to render. */
  emptyMessage?: string;
}

/**
 * The trade journal, rendered as a real table rather than a PDF link so it is
 * searchable and indexable. Doubles as the accessible table view for the
 * equity curve above it.
 */
export function TradeTable({ trades, reportFile, emptyMessage }: TradeTableProps) {
  const [shown, setShown] = useState(PAGE);

  if (!trades.length) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          {emptyMessage ?? "The trade journal appears here once the backtest report is imported."}
        </p>
      </div>
    );
  }

  const visible = trades.slice(0, shown);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">
            Closed trades, showing {visible.length} of {trades.length}
          </caption>
          <thead>
            <tr className="border-b border-border bg-card">
              <Th>#</Th>
              <Th>Opened</Th>
              <Th>Closed</Th>
              <Th>Side</Th>
              <Th align="right">Lots</Th>
              <Th align="right">Entry</Th>
              <Th align="right">Exit</Th>
              <Th align="right">R</Th>
              <Th align="right">P/L</Th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t, i) => (
              <tr key={t.id} className="border-b border-border/60 last:border-0 hover:bg-card/60">
                <Td className="text-muted-foreground">{i + 1}</Td>
                <Td className="whitespace-nowrap text-muted-foreground">{fmtDateTime(t.openTime)}</Td>
                <Td className="whitespace-nowrap text-muted-foreground">{fmtDateTime(t.closeTime)}</Td>
                <Td>
                  <span className="text-xs uppercase tracking-wide">
                    {t.side === "buy" ? "Buy" : "Sell"}
                  </span>
                </Td>
                <Td align="right">{t.lots.toFixed(2)}</Td>
                <Td align="right">{t.entry.toFixed(2)}</Td>
                <Td align="right">{t.exit.toFixed(2)}</Td>
                <Td align="right" className="text-muted-foreground">
                  {t.rMultiple === undefined ? "—" : `${t.rMultiple > 0 ? "+" : ""}${t.rMultiple.toFixed(2)}`}
                </Td>
                {/* Sign is carried by the +/- glyph, not by colour alone */}
                <Td align="right" className={t.pnl >= 0 ? "font-medium" : "font-medium text-muted-foreground"}>
                  {fmtPnl(t.pnl)}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {shown < trades.length && (
          <button
            type="button"
            onClick={() => setShown((s) => Math.min(s + PAGE, trades.length))}
            className="focus-ring rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:border-accent/50 hover:text-foreground"
          >
            Show {Math.min(PAGE, trades.length - shown)} more
          </button>
        )}
        <p className="text-xs text-muted-foreground">
          Showing {visible.length} of {trades.length} closed trades
        </p>
        {reportFile && (
          <a
            href={reportFile}
            download
            className="focus-ring ml-auto text-sm text-muted-foreground underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
          >
            Download full report
          </a>
        )}
      </div>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      scope="col"
      className={`px-3 py-2.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  className = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <td
      className={`px-3 py-2 font-mono text-xs tabular-nums ${
        align === "right" ? "text-right" : "text-left"
      } ${className}`}
    >
      {children}
    </td>
  );
}
