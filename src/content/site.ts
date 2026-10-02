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
  // Phase 2 copy is draft, based on the project brief, not approved marketing claims.
  copyReview: "Draft copy: Hero, Problem, and Solution await owner approval.",
  hero: {
    eyebrow: "Property management. AI + human.",
    headline: "Scale your portfolio.",
    headlineAccent: "Not your back-office headcount.",
    description:
      "Cloud Krown brings property management specialists, AI agents, and workflow automation together as one operating workforce for U.S. property management companies.",
    secondaryCta: { label: "Talk through your operations", href: "#contact" },
    supportingLine:
      "Automation for the volume. Experienced people for the judgment.",
    workflow: {
      label: "One connected workforce",
      inputs: [
        { title: "AI workflows", detail: "Repetitive tasks" },
        { title: "Automation", detail: "Connected processes" },
      ],
      checkpoint: "Human checkpoint",
      specialists: "Experienced specialists",
      responsibilities: "Exceptions. Decisions. Quality control.",
      output: "Your back office",
      outputDetail: "Property operations + accounting",
      caption: "Illustrative operating model, not a product interface.",
    },
  },
  problem: {
    eyebrow: "The back-office bottleneck",
    headline: "More properties. More moving parts.",
    description:
      "Every growing portfolio brings more invoices, reconciliations, maintenance requests, and conversations. When the process stays manual, the workload grows with it.",
    perspective:
      "Adding people can increase capacity. It does not, by itself, change how the work gets done. Traditional outsourcing can move tasks to another team while leaving the same manual processes in place.",
    pressures: [
      {
        title: "Recurring volume",
        description:
          "The routine work keeps coming: invoices, rent collection support, and updates across the portfolio.",
      },
      {
        title: "More handoffs",
        description:
          "Accounting, property operations, and communication all need to stay connected.",
      },
      {
        title: "Decisions still matter",
        description:
          "Exceptions, owner questions, and quality checks need experienced human judgment.",
      },
    ],
  },
  solution: {
    eyebrow: "How it works",
    headline: "Automate the repeatable. Keep people in the loop.",
    description:
      "Not people on one side and technology on the other. One workforce, with each kind of work handled where it belongs.",
    automation: {
      label: "Built for volume",
      title: "AI + automation",
      description:
        "Handle repetitive, high-volume work through connected workflows.",
      tasks: [
        "Repeatable back-office tasks",
        "Routine workflow steps",
        "High-volume processing",
      ],
    },
    specialists: {
      label: "Built for judgment",
      title: "Experienced specialists",
      description:
        "Keep people involved where context, communication, and decisions matter.",
      tasks: [
        "Exceptions and decisions",
        "Tenant and owner communication",
        "Quality control and review",
      ],
    },
    closing: "Connected workflows. Human oversight.",
    closingDetail:
      "AI, automation, and specialists operate together, not as separate handoffs.",
  },
  shell: {
    sections: [
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
