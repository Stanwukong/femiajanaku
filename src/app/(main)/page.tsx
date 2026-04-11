import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CallToAction } from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <CallToAction />
    </>
  );
}
