import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Differentiator } from "@/components/sections/Differentiator";
import { Platforms } from "@/components/sections/Platforms";
import { Team } from "@/components/sections/Team";
import { Vision } from "@/components/sections/Vision";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="-mt-24">
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Differentiator />
      <Platforms />
      <Team />
      <Vision />
      <Contact />
    </main>
  );
}
