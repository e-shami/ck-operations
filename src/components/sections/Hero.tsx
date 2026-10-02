import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";

export function Hero() {
  const { hero } = site;

  return (
    <Section
      id="hero"
      tone="dark"
      aria-labelledby="hero-heading"
      className="bg-gradient-to-br from-brand-950 via-brand-950 to-brand-700 pt-40 md:pt-52"
    >
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="mb-6 flex items-center gap-3 text-eyebrow-mobile uppercase text-sky-400 md:text-eyebrow">
            <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
            {hero.eyebrow}
          </p>
          <Heading
            as="h1"
            size="display"
            id="hero-heading"
            className="text-balance"
          >
            {hero.headline}
            <span className="mt-2 block text-sky-400">
              {hero.headlineAccent}
            </span>
          </Heading>
          <p className="mt-8 max-w-prose text-body-large-mobile text-sky-200 md:text-body-large">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={site.primaryCta.href} tone="dark">
              {site.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              tone="dark"
              variant="secondary"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-6 text-caption text-sky-200">
            {hero.supportingLine}
          </p>
        </div>

        <figure
          className="mx-auto w-full max-w-lg lg:col-span-5"
          aria-labelledby="workflow-caption"
        >
          <p className="mb-8 text-center text-eyebrow-mobile uppercase text-sky-400 md:text-eyebrow">
            {hero.workflow.label}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {hero.workflow.inputs.map((input) => (
              <div
                key={input.title}
                className="rounded-card border border-sky-200/30 bg-white/5 px-3 py-5 text-center sm:px-5"
              >
                <span
                  aria-hidden="true"
                  className="mx-auto mb-4 block size-3 rounded-full border border-sky-400 bg-sky-400/20"
                />
                <p className="font-heading text-body font-semibold">
                  {input.title}
                </p>
                <p className="mt-1 text-caption text-sky-200">{input.detail}</p>
              </div>
            ))}
          </div>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 400 64"
            className="h-16 w-full text-sky-400"
            fill="none"
          >
            <path
              d="M96 0v16q0 16 16 16h72q16 0 16 16v16M304 0v16q0 16-16 16h-72q-16 0-16 16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="200" cy="48" r="4" fill="currentColor" />
          </svg>
          <div className="rounded-card border border-sky-400 bg-brand-950 px-5 py-6 text-center shadow-card sm:px-8">
            <p className="text-eyebrow-mobile uppercase text-sky-400 md:text-eyebrow">
              {hero.workflow.checkpoint}
            </p>
            <p className="mt-3 font-heading text-subheading-mobile md:text-subheading">
              {hero.workflow.specialists}
            </p>
            <p className="mt-2 text-caption text-sky-200">
              {hero.workflow.responsibilities}
            </p>
          </div>
          <div aria-hidden="true" className="mx-auto h-8 w-px bg-sky-400" />
          <div className="mx-5 border-t border-sky-200/30 pt-5 text-center">
            <p className="font-heading text-body font-semibold">
              {hero.workflow.output}
            </p>
            <p className="mt-1 text-caption text-sky-200">
              {hero.workflow.outputDetail}
            </p>
          </div>
          <figcaption
            id="workflow-caption"
            className="mt-8 text-center text-caption text-sky-200"
          >
            {hero.workflow.caption}
          </figcaption>
        </figure>
      </div>
      <p className="mt-12 border-t border-sky-200/20 pt-5 text-caption text-sky-200">
        {site.copyReview}
      </p>
    </Section>
  );
}
