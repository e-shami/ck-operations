import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Services() {
  const { services } = site;

  return (
    <Section id="services" aria-labelledby="services-heading" tabIndex={-1}>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-7">
          <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
            {services.eyebrow}
          </p>
          <Heading id="services-heading" className="text-balance">
            {services.headline}
          </Heading>
        </div>
        <p className="max-w-prose text-body-large-mobile text-slate-600 md:text-body-large lg:col-span-5">
          {services.description}
        </p>
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {services.groups.map((group, index) => (
          <li
            key={group.title}
            className="rounded-card border border-slate-200 bg-white p-6 shadow-card motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 md:p-8"
          >
            <span
              aria-hidden="true"
              className="mb-6 inline-flex size-11 items-center justify-center rounded-control bg-sky-100 text-caption font-semibold tabular-nums text-brand-700"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <Heading as="h3" size="subheading">
              {group.title}
            </Heading>
            <p className="mt-3 max-w-prose text-slate-600">
              {group.description}
            </p>
            <ul className="mt-6 space-y-3 border-t border-slate-200 pt-5">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-900">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2 shrink-0 rounded-full bg-brand-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
