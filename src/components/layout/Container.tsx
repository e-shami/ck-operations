import type { ComponentPropsWithoutRef } from "react";

export function Container({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-container px-5 md:px-8 ${className}`}
      {...props}
    />
  );
}
