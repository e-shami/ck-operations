"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderSurface({ children }: { children: ReactNode }) {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setOverHero(false);
      return;
    }

    // The fixed 6rem header switches as the hero passes its lower edge.
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-theme={overHero ? "dark" : "light"}
      className="group/header sticky top-0 z-40 border-b border-slate-200 bg-white data-[theme=dark]:border-sky-200/20 data-[theme=dark]:bg-brand-950/95 data-[theme=dark]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
