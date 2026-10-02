import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Differentiator() {
  const { differentiator } = site;

  return (
    <Section
      id="differentiator"
      tone="tinted"
      aria-labelledby="differentiator-heading"
      tabIndex={-1}
    >
      <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
        {differentiator.eyebrow}
      </p>
      <Heading id="differentiator-heading" className="max-w-prose text-balance">
        {differentiator.headline}
      </Heading>
      <p className="mt-6 max-w-prose text-body-large-mobile text-slate-600 md:text-body-large">
        {differentiator.description}
      </p>
      <dl className="mt-12 divide-y divide-sky-200 border-y border-sky-200">
        {differentiator.comparison.map((row) => (
          <div
            key={row.topic}
            className="grid gap-5 py-6 md:grid-cols-12 md:gap-8 md:py-8"
          >
            <dt className="font-heading font-semibold text-brand-950 md:col-span-3">
              {row.topic}
            </dt>
            <dd className="text-slate-600 md:col-span-4">
              <span className="mb-2 block text-eyebrow-mobile uppercase md:text-eyebrow">
                {differentiator.taskLabel}
              </span>
              {row.task}
            </dd>
            <dd className="border-l-2 border-brand-600 pl-5 text-ink-900 md:col-span-5">
              <span className="mb-2 block text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
                {differentiator.workforceLabel}
              </span>
              {row.workforce}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 max-w-prose text-caption text-slate-600">
        {differentiator.note}
      </p>
    </Section>
  );
}
