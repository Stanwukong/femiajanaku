import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { HashScroll } from "@/components/layout/HashScroll";
import { ScrollRail } from "@/components/layout/ScrollRail";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <HashScroll />
      <Navbar />
      <ScrollRail />
      <main id="main-content" className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
