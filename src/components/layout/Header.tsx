import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <Container className="flex min-h-24 items-center justify-between gap-6 py-4">
        <a
          href="#top"
          aria-label={site.brand.homeLabel}
          className="flex min-h-11 shrink-0 flex-col justify-center rounded-control text-brand-700"
        >
          <span className="font-heading text-xl font-bold tracking-tight">
            {site.brand.wordmark}
          </span>
          <span className="text-eyebrow-mobile uppercase md:text-eyebrow">
            {site.brand.descriptor}
          </span>
        </a>
        <nav
          aria-label={site.accessibility.primaryNav}
          className="hidden md:block"
        >
          <ul className="flex items-center gap-5 lg:gap-8">
            {site.navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-control text-caption text-slate-600 underline-offset-4 hover:text-brand-700 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button href={site.primaryCta.href}>
                {site.primaryCta.label}
              </Button>
            </li>
          </ul>
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}
