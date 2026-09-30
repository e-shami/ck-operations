import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3";
  size?: "display" | "heading" | "subheading";
};

const sizes = {
  display: "text-display-mobile md:text-display",
  heading: "text-heading-mobile md:text-heading",
  subheading: "text-subheading-mobile md:text-subheading",
};

export function Heading({
  as: Tag = "h2",
  size = "heading",
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Tag className={`font-heading ${sizes[size]} ${className}`} {...props} />
  );
}
