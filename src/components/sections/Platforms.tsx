import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Platforms() {
  const { platforms } = site;

  return (
    <Section id="platforms" aria-labelledby="platforms-heading" tabIndex={-1}>
      <div className="mx-auto max-w-prose text-center">
        <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
          {platforms.eyebrow}
        </p>
        <Heading id="platforms-heading" className="text-balance">
          {platforms.headline}
        </Heading>
        <p className="mt-6 text-body-large-mobile text-slate-600 md:text-body-large">
          {platforms.description}
        </p>
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-6 border-y border-slate-200 py-8 md:gap-x-10 lg:gap-x-12">
        {platforms.names.map((name) => (
          <li
            key={name}
            className="font-heading text-subheading-mobile font-semibold text-slate-600"
          >
            {name}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-5 max-w-prose text-center text-caption text-slate-600">
        {platforms.note}
      </p>
    </Section>
  );
}
