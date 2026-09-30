"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div
      className="md:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={
          open ? site.accessibility.closeMenu : site.accessibility.openMenu
        }
        onClick={() => setOpen(!open)}
        className="flex min-h-11 min-w-11 items-center gap-3 rounded-control border border-brand-700 px-3 text-caption font-semibold text-brand-700"
      >
        {site.accessibility.menu}
        <span aria-hidden="true" className="text-xl leading-none">
          {open ? "-" : "+"}
        </span>
      </button>
      <nav
        id="mobile-navigation"
        hidden={!open}
        aria-label={site.accessibility.mobileNav}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto border-b border-slate-200 bg-white px-5 py-5 shadow-card"
      >
        <ul className="space-y-2">
          {[...site.navigation, site.primaryCta].map((link, index) => (
            <li key={link.href}>
              <Button
                href={link.href}
                variant={
                  index === site.navigation.length ? "primary" : "secondary"
                }
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  // Keep keyboard focus out of the disclosure after it closes.
                  document
                    .getElementById(link.href.slice(1))
                    ?.focus({ preventScroll: true });
                }}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
