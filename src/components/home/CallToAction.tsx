import { Container } from "@/components/ui/Container";
import { SITE } from "@/data/site";

export function CallToAction() {
  return (
    <section className="py-[var(--section-gap)]" data-animate="entrance">
      <Container size="lg" className="text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Get in touch
        </p>
        <h2 className="text-h1 mb-6">
          Interested in
          <br />
          working <span className="text-accent">together?</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-ring"
          >
            Send an email
          </a>
          <a
            href={SITE.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors duration-200 focus-ring"
          >
            Book a call
          </a>
        </div>
      </Container>
    </section>
  );
}
