import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/content/site";
import { getContactEnv } from "@/lib/env";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { NEXT_PUBLIC_CONTACT_EMAIL: contactEmail } = getContactEnv();
  return (
    <Section id="contact" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mb-4 text-eyebrow-mobile uppercase text-brand-700 md:text-eyebrow">
            {site.contact.eyebrow}
          </p>
          <Heading id="contact-heading" className="text-balance">
            {site.contact.headline}
          </Heading>
          <p className="mt-6 max-w-prose text-body-large-mobile text-slate-600 md:text-body-large">
            {site.contact.description}
          </p>
          <p className="mt-8 text-caption text-slate-600">
            {site.contact.directEmail}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex min-h-11 max-w-full items-center break-all rounded-control text-brand-700 underline underline-offset-4"
          >
            {contactEmail}
          </a>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <ContactForm contactEmail={contactEmail} />
        </div>
      </div>
    </Section>
  );
}
