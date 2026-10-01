import type { Project } from "@/types";

/**
 * Stand-in for a screenshot on client work we can't show. Typographic on the
 * same dot grid as the hero, so it reads as deliberate rather than missing.
 */
export function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/40">
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <span className="relative font-display text-4xl md:text-5xl font-bold tracking-tighter">
        {project.name}
      </span>
      {project.caseStudy && (
        <span className="relative px-3 py-1 rounded-full border border-border bg-background/80 text-xs uppercase tracking-widest text-muted-foreground">
          Case study
        </span>
      )}
    </div>
  );
}
