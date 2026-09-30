import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "light" | "tinted" | "dark";
};

const tones = {
  light: "bg-white text-brand-950",
  tinted: "bg-sky-50 text-brand-950",
  dark: "bg-brand-950 text-white",
};

export function Section({
  tone = "light",
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={`py-section md:py-section-desktop ${tones[tone]} ${className}`}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
