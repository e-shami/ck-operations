import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Problem() {
  const { problem } = site;

  return (
    <Section id="problem" aria-labelledby="problem-heading" tabIndex={-1}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
            {problem.eyebrow}
          </p>
          <Heading id="problem-heading" className="text-balance">
            {problem.headline}
          </Heading>
        </div>
        <div className="space-y-5 lg:col-span-7">
          <p className="max-w-prose text-body-large-mobile text-ink-900 md:text-body-large">
            {problem.description}
          </p>
          <p className="max-w-prose text-slate-600">{problem.perspective}</p>
        </div>
      </div>
      <ul className="mt-12 grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-3 md:gap-10">
        {problem.pressures.map((pressure, index) => (
          <li key={pressure.title}>
            <span
              aria-hidden="true"
              className="text-eyebrow-mobile tabular-nums text-brand-700 md:text-eyebrow"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <Heading as="h3" size="subheading" className="mt-4">
              {pressure.title}
            </Heading>
            <p className="mt-3 max-w-prose text-slate-600">
              {pressure.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
