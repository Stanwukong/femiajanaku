"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "next-view-transitions";
import { SITE } from "@/data/site";

/**
 * Wraps the resume PDF with a load beat so the route feels part of the journey
 * rather than a bare iframe: a slim progress bar creeps while the PDF loads,
 * completes on load, and the document fades in behind a small header.
 */
export function ResumeViewer() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(8);

  // Creep toward 90% while loading; the onLoad handler finishes the bar.
  useEffect(() => {
    if (loaded) return;
    const id = setInterval(() => {
      setProgress((p) => (p < 90 ? Math.min(90, p + Math.random() * 14) : p));
    }, 220);
    return () => clearInterval(id);
  }, [loaded]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-[var(--content-padding)]">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Resume
        </span>

        <a
          href={SITE.cvPath}
          download
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors duration-200 hover:bg-muted"
          data-cursor="pointer"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
      </header>

      {/* Load progress bar */}
      <div
        className="h-0.5 shrink-0 bg-transparent"
        role="progressbar"
        aria-valuenow={Math.round(loaded ? 100 : progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading resume"
      >
        <div
          className="h-full bg-accent transition-[width,opacity] duration-300 ease-out"
          style={{
            width: `${loaded ? 100 : progress}%`,
            opacity: loaded ? 0 : 1,
          }}
        />
      </div>

      {/* Document */}
      <div className="relative flex-1">
        <iframe
          src={SITE.cvPath}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-none transition-opacity duration-700 ease-out"
          style={{ opacity: loaded ? 1 : 0 }}
          title="Femi Ajanaku's Resume"
        />
      </div>
    </div>
  );
}
