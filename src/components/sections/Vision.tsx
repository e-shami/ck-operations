import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Vision() {
  const { vision } = site;

  return (
    <Section
      id="vision"
      tone="dark"
      aria-labelledby="vision-heading"
      tabIndex={-1}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="mb-4 flex items-center gap-3 text-eyebrow-mobile uppercase text-sky-400 md:text-eyebrow">
            <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
            {vision.eyebrow}
          </p>
          <Heading id="vision-heading" className="text-balance">
            {vision.headline}
          </Heading>
        </div>
        <div className="lg:col-span-6">
          <p className="max-w-prose text-body-large-mobile text-sky-200 md:text-body-large">
            {vision.description}
          </p>
          <p className="mt-5 max-w-prose text-sky-200">{vision.detail}</p>
          <Button
            href={vision.cta.href}
            tone="dark"
            className="mt-8 w-full sm:w-auto"
          >
            {vision.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
