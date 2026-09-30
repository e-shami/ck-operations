import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      brand: { 950: "#081B44", 700: "#013A7F", 600: "#1F5DB8" },
      sky: { 400: "#90D0F3", 200: "#BFDDF7", 100: "#E3F0FC", 50: "#F3F8FE" },
      ink: { 900: "#0F172A" },
      slate: { 600: "#475569", 200: "#E2E8F0" },
      danger: { 600: "#DC2626" },
      success: { 600: "#16A34A" },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      heading: ["var(--font-jakarta)", "system-ui", "sans-serif"],
    },
    extend: {
      maxWidth: { container: "75rem", prose: "65ch" },
      spacing: { section: "4rem", "section-desktop": "7rem" },
      borderRadius: { control: "0.5rem", card: "1rem" },
      boxShadow: { card: "0 1px 2px rgb(8 27 68 / 0.06)" },
      fontSize: {
        "display-mobile": ["2.25rem", { lineHeight: "1.1", fontWeight: "800" }],
        display: ["3.75rem", { lineHeight: "1.1", fontWeight: "800" }],
        "heading-mobile": ["1.75rem", { lineHeight: "1.2", fontWeight: "700" }],
        heading: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "subheading-mobile": [
          "1.25rem",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        subheading: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-large-mobile": ["1.125rem", { lineHeight: "1.6" }],
        "body-large": ["1.25rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        "eyebrow-mobile": [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" },
        ],
        eyebrow: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
