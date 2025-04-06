import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center max-w-6xl mx-auto scrollbar-hide overflow-y-scroll">
      <Hero />
      <Services/>
    </main>
  );
}
