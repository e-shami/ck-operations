import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { Differentiator } from "@/components/sections/Differentiator";
import { Platforms } from "@/components/sections/Platforms";
import { Vision } from "@/components/sections/Vision";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="-mt-24">
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <Differentiator />
      <Platforms />
      <Vision />
      <Section id="contact" aria-labelledby="contact-heading" tabIndex={-1}>
        <Heading id="contact-heading">{site.contact.heading}</Heading>
        <p className="mt-4 max-w-prose text-slate-600">
          {site.contact.placeholder}
        </p>
      </Section>
    </main>
  );
}
