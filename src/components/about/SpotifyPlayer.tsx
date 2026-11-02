"use client";

import { Container } from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SpotifyPlayer() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="py-[var(--section-gap)] bg-muted/30"
      data-animate="entrance"
    >
      <Container size="sm" className="text-center">
        <p
          className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
          data-reveal
        >
          Vibes
        </p>
        <h2 className="text-h3 mb-8" data-reveal>
          What I&apos;m <span className="text-accent">listening to.</span>
        </h2>
        <iframe
          data-reveal
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/7lNFaTHV5IH8xaSXPqllOn?utm_source=generator&si=d0afa309e3ee4c66"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </Container>
    </section>
  );
}
