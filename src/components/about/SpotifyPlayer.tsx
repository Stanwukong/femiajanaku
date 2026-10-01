import { Container } from "@/components/ui/Container";

export function SpotifyPlayer() {
  return (
    <section
      className="py-[var(--section-gap)] bg-muted/30"
      data-animate="entrance"
    >
      <Container size="sm" className="text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Vibes
        </p>
        <h2 className="text-h3 mb-8">
          What I&apos;m <span className="text-accent">listening to.</span>
        </h2>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/1qt1MqjmSLTWwjhn46uDUn?utm_source=generator&si=66bcf34c13c2407f"
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
