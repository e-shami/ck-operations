import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { HeaderSurface } from "./HeaderSurface";

export function Header() {
  return (
    <HeaderSurface>
      <Container className="flex min-h-24 items-center justify-between gap-6 py-4">
        <a
          href="#top"
          aria-label={site.brand.homeLabel}
          className="flex min-h-11 shrink-0 flex-col justify-center rounded-control text-brand-700 group-data-[theme=dark]/header:text-white group-data-[theme=dark]/header:focus-visible:outline-sky-400"
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
                  className="inline-flex min-h-11 items-center rounded-control text-caption text-slate-600 underline-offset-4 hover:text-brand-700 hover:underline group-data-[theme=dark]/header:text-sky-200 group-data-[theme=dark]/header:hover:text-white group-data-[theme=dark]/header:focus-visible:outline-sky-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                href={site.primaryCta.href}
                className="group-data-[theme=dark]/header:border-white group-data-[theme=dark]/header:bg-white group-data-[theme=dark]/header:text-brand-950 group-data-[theme=dark]/header:hover:border-sky-200 group-data-[theme=dark]/header:hover:bg-sky-200 group-data-[theme=dark]/header:focus-visible:outline-sky-400"
              >
                {site.primaryCta.label}
              </Button>
            </li>
          </ul>
        </nav>
        <MobileNav />
      </Container>
    </HeaderSurface>
  );
}
