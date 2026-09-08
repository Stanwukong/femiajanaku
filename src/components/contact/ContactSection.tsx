import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { BookingCard } from "@/components/contact/BookingCard";
import { SITE } from "@/data/site";

export function ContactSection() {
  return (
    <section className="py-[var(--section-gap)]" data-animate="entrance">
      <Container size="md">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Contact
          </p>
          <h2 className="text-h1 mb-4">
            Let&apos;s build something
            <br />
            <span className="text-accent">together.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Fill out the form
            below or book a call directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <div className="space-y-6">
            <BookingCard />
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="font-display font-semibold mb-2">Direct email</h3>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-accent hover:underline underline-offset-4"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
