import { Link } from "next-view-transitions";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* CTA Section */}
      <Container size="lg" className="py-[var(--section-gap)]">
        <div className="space-y-6">
          <h2 className="text-h1 font-display">
            Let&apos;s work
            <br />
            <span className="text-accent">together.</span>
          </h2>
          <div className="flex flex-wrap gap-4">
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
        </div>
      </Container>

      {/* Links Section */}
      <Container size="lg" className="py-8 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </p>
            <div className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block text-sm text-foreground hover:text-accent transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </p>
            <div className="space-y-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground hover:text-accent transition-colors duration-200"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Credits */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Site
            </p>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Tailwind CSS, and GSAP.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Deployed on Vercel.
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <Container
        size="lg"
        className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2"
      >
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground italic">
          {SITE.tagline}
        </p>
      </Container>
    </footer>
  );
}
