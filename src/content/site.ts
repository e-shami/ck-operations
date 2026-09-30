export const site = {
  brand: {
    name: "Cloud Krown Operations",
    wordmark: "Cloud Krown",
    descriptor: "Operations",
    homeLabel: "Cloud Krown Operations home",
  },
  accessibility: {
    skipLink: "Skip to content",
    primaryNav: "Main navigation",
    mobileNav: "Mobile navigation",
    footerNav: "Footer navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
  },
  navigation: [
    { label: "How it works", href: "#solution" },
    { label: "Services", href: "#services" },
    { label: "Platforms", href: "#platforms" },
  ],
  primaryCta: { label: "Book a call", href: "#contact" },
  shell: {
    label: "[PLACEHOLDER: Page content follows in Phases 2-4]",
    sections: [
      {
        id: "problem",
        title: "Problem",
        placeholder: "[PLACEHOLDER: Problem section copy]",
        tone: "tinted",
      },
      {
        id: "solution",
        title: "How it works",
        placeholder: "[PLACEHOLDER: Solution section copy]",
        tone: "light",
      },
      {
        id: "services",
        title: "Services",
        placeholder: "[PLACEHOLDER: Services section copy]",
        tone: "tinted",
      },
      {
        id: "differentiator",
        title: "Not a virtual assistant company",
        placeholder: "[PLACEHOLDER: Differentiation section copy]",
        tone: "light",
      },
      {
        id: "platforms",
        title: "Platforms",
        placeholder: "[PLACEHOLDER: Platform compatibility section]",
        tone: "tinted",
      },
      {
        id: "vision",
        title: "Vision",
        placeholder: "[PLACEHOLDER: Vision section copy]",
        tone: "dark",
      },
      {
        id: "contact",
        title: "Contact",
        placeholder:
          "[PLACEHOLDER: Contact form and booking details in Phase 4]",
        tone: "light",
      },
    ],
  },
  footer: {
    contactPlaceholder: "[PLACEHOLDER: Contact email]",
    legalPlaceholder:
      "[PLACEHOLDER: Privacy policy and terms links pending approved pages]",
    copyright: "Cloud Krown Operations",
  },
} as const;
