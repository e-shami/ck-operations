import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Solution() {
  const { solution } = site;

  return (
    <Section
      id="solution"
      tone="tinted"
      aria-labelledby="solution-heading"
      tabIndex={-1}
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-7">
          <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
            {solution.eyebrow}
          </p>
          <Heading id="solution-heading" className="text-balance">
            {solution.headline}
          </Heading>
        </div>
        <p className="max-w-prose text-body-large-mobile text-slate-600 md:text-body-large lg:col-span-5">
          {solution.description}
        </p>
      </div>
      <div className="mt-12 overflow-hidden rounded-card border border-sky-200 bg-white shadow-card">
        <div className="grid md:grid-cols-2">
          {[solution.automation, solution.specialists].map((team, index) => (
            <div
              key={team.title}
              className={`p-6 md:p-8 lg:p-10 ${index === 0 ? "border-b border-sky-200 bg-sky-100/50 md:border-b-0 md:border-r" : ""}`}
            >
              <p className="text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
                {team.label}
              </p>
              <Heading as="h3" size="subheading" className="mt-4">
                {team.title}
              </Heading>
              <p className="mt-4 max-w-prose text-slate-600">
                {team.description}
              </p>
              <ul className="mt-6 space-y-3">
                {team.tasks.map((task) => (
                  <li
                    key={task}
                    className="flex items-start gap-3 text-ink-900"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 block size-2 shrink-0 rounded-full bg-brand-600"
                    />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-sky-200 px-6 py-6 md:flex md:items-center md:justify-between md:gap-8 md:px-8 lg:px-10">
          <p className="font-heading font-semibold text-brand-700">
            {solution.closing}
          </p>
          <p className="mt-2 max-w-prose text-caption text-slate-600 md:mt-0 md:max-w-sm">
            {solution.closingDetail}
          </p>
        </div>
      </div>
    </Section>
  );
}
