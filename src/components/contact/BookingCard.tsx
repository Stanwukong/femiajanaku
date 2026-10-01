import { Calendar } from "lucide-react";
import { SITE } from "@/data/site";

export function BookingCard() {
  return (
    <a
      href={SITE.calUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-lg border border-border bg-card hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 focus-ring group"
    >
      <Calendar className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
      <h3 className="font-display font-semibold mb-1">Book a call</h3>
      <p className="text-sm text-muted-foreground">
        Schedule a 30-minute intro call about a role or project.
      </p>
    </a>
  );
}
