import { site } from "@/content/site";
import { Container } from "./Container";
import { getContactEnv } from "@/lib/env";

export function Footer() {
  const { NEXT_PUBLIC_CONTACT_EMAIL: contactEmail } = getContactEnv();
  return (
    <footer data-tone="dark" className="bg-brand-950 py-12 text-white md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <a
              href="#top"
              aria-label={site.brand.homeLabel}
              className="inline-flex min-h-11 flex-col justify-center rounded-control"
            >
              <span className="font-heading text-subheading-mobile font-bold md:text-subheading">
                {site.brand.wordmark}
              </span>
              <span className="text-eyebrow-mobile uppercase text-sky-400 md:text-eyebrow">
                {site.brand.descriptor}
              </span>
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-6 inline-flex min-h-11 max-w-full items-center break-all rounded-control text-caption text-sky-200 underline underline-offset-4"
            >
              {contactEmail}
            </a>
          </div>
          <nav
            aria-label={site.accessibility.footerNav}
            className="md:justify-self-end"
          >
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {[...site.navigation, site.primaryCta].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-control text-caption text-sky-200 underline-offset-4 hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-sky-200/20 pt-6 text-caption text-sky-200 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.footer.copyright}
          </p>
          <p className="max-w-prose">{site.footer.legalPlaceholder}</p>
        </div>
      </Container>
    </footer>
  );
}
