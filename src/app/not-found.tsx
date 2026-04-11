import { Link } from "next-view-transitions";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container size="sm" className="text-center">
        <p className="text-8xl font-display font-bold text-accent mb-4">404</p>
        <h1 className="text-h2 mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-ring"
        >
          Go home
        </Link>
      </Container>
    </div>
  );
}
