import type { ComponentPropsWithoutRef } from "react";

type Appearance = {
  variant?: "primary" | "secondary";
  tone?: "light" | "dark";
};
type ButtonProps = Appearance &
  (
    | (ComponentPropsWithoutRef<"a"> & { href: string })
    | (ComponentPropsWithoutRef<"button"> & { href?: never })
  );

const variants = {
  light: {
    primary:
      "border-brand-700 bg-brand-700 text-white hover:border-brand-600 hover:bg-brand-600",
    secondary: "border-brand-700 text-brand-700 hover:bg-sky-100",
  },
  dark: {
    primary:
      "border-white bg-white text-brand-950 hover:border-sky-200 hover:bg-sky-200",
    secondary: "border-white text-white hover:bg-white/10",
  },
};

export function Button({
  variant = "primary",
  tone = "light",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-control border px-5 py-3 text-caption font-semibold motion-safe:transition-colors motion-safe:duration-200 ${variants[tone][variant]} ${className}`;

  if (typeof props.href === "string") {
    return <a {...props} className={classes} />;
  }

  return (
    <button
      type="button"
      {...props}
      className={`${classes} disabled:pointer-events-none disabled:opacity-50`}
    />
  );
}
