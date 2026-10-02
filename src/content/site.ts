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
  // Marketing copy remains draft until explicitly approved by the owner.
  copyReview: "Draft copy: All marketing sections await owner approval.",
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
  services: {
    eyebrow: "Services",
    headline: "The work behind every property.",
    description:
      "Property operations, accounting, and the day-to-day details, supported by specialists and connected workflows.",
    groups: [
      {
        title: "Property management outsourcing",
        description:
          "Support for the recurring operational work that keeps your back office moving.",
        items: ["Administrative operations", "Rent collection support"],
      },
      {
        title: "Property accounting & bookkeeping",
        description:
          "Specialist support for the books, transactions, and reporting behind your portfolio.",
        items: [
          "AP/AR",
          "Bank reconciliations",
          "Trust accounting",
          "Financial reporting",
        ],
      },
      {
        title: "Leasing & resident support",
        description:
          "Coordination across the leasing cycle, from the first steps to the next renewal.",
        items: ["Leasing support", "Renewals", "Move-ins/move-outs"],
      },
      {
        title: "Maintenance & communication",
        description:
          "Support for maintenance coordination and the conversations that need a human response.",
        items: ["Maintenance coordination", "Tenant & owner communication"],
      },
    ],
  },
  differentiator: {
    eyebrow: "A different operating model",
    headline: "Not a virtual assistant company.",
    description:
      "The difference is how the work is organized. Cloud Krown brings AI, automation, and specialists together as an operating workforce, rather than treating every task as another assignment for a person.",
    taskLabel: "Task-first support",
    workforceLabel: "Cloud Krown's workforce",
    comparison: [
      {
        topic: "Starting point",
        task: "Delegate individual tasks to a person.",
        workforce:
          "Connect property operations and accounting through shared workflows.",
      },
      {
        topic: "Repeatable work",
        task: "Assign recurring work as another queue of tasks.",
        workforce: "Use AI and automation for repetitive, high-volume work.",
      },
      {
        topic: "Human contribution",
        task: "A person carries out the assigned tasks.",
        workforce:
          "Specialists handle exceptions, decisions, communication, and quality control.",
      },
    ],
    note: "An illustration of two operating approaches, not a claim about every virtual assistant provider.",
  },
  platforms: {
    eyebrow: "Works with",
    headline: "The software your team already uses.",
    description:
      "Support for workflows across property management and accounting platforms.",
    names: [
      "AppFolio",
      "Buildium",
      "Rent Manager",
      "DoorLoop",
      "Yardi",
      "QuickBooks",
      "Xero",
    ],
    note: "Platform names indicate workflow compatibility only, not partnerships or endorsements.",
  },
  vision: {
    eyebrow: "The vision",
    headline: "Beyond outsourcing. A different way to grow.",
    description:
      "Our vision is a back office where operational capacity can grow with the portfolio, without continuously adding headcount.",
    detail:
      "Automate what machines do best. Keep experienced professionals where human judgment matters. Build the two into one operating workforce.",
    cta: { label: "Talk about your portfolio", href: "#contact" },
  },
  contact: {
    heading: "Contact",
    placeholder: "[PLACEHOLDER: Contact form and booking details in Phase 4]",
  },
  footer: {
    contactPlaceholder: "[PLACEHOLDER: Contact email]",
    legalPlaceholder:
      "[PLACEHOLDER: Privacy policy and terms links pending approved pages]",
    copyright: "Cloud Krown Operations",
  },
} as const;
