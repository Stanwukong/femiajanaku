import { FileText } from "lucide-react";
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
            Hiring?
            <br />
            <span className="text-accent">Let&apos;s talk.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            I&apos;m looking for a full-time fullstack or AI engineering role, remote
            or in Lagos. Send a note about the role, book a call, or grab my CV below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <div className="space-y-6">
            <BookingCard />
            <a
              href={SITE.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 focus-ring group"
            >
              <FileText className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-semibold mb-1">View my CV</h3>
              <p className="text-sm text-muted-foreground">
                Experience, stack and education on one page (PDF).
              </p>
            </a>
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
