import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Section aria-labelledby="page-heading">
        <Heading
          as="h1"
          size="display"
          id="page-heading"
          className="max-w-prose"
        >
          {site.brand.name}
        </Heading>
        <p className="mt-6 max-w-prose text-slate-600">{site.shell.label}</p>
      </Section>
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
