import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="-mt-24">
      <Hero />
      <Problem />
      <Solution />
      {site.shell.sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          tone={section.tone}
          tabIndex={-1}
          aria-labelledby={`${section.id}-heading`}
        >
          <Heading id={`${section.id}-heading`}>{section.title}</Heading>
          <p
            className={`mt-4 max-w-prose ${section.tone === "dark" ? "text-sky-200" : "text-slate-600"}`}
          >
            {section.placeholder}
          </p>
        </Section>
      ))}
    </main>
  );
}
