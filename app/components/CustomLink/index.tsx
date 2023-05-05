import Link, { LinkProps } from "next/link";
type Props = Omit<ComponentProps<"a">, "href"> & {
  variant: "primary" | "secondary";
  href: LinkProps<any>;
};
import clsx from "clsx";
import { ComponentProps } from "react";

const variants: Record<Props["variant"], string> = {
  primary: "bg-brand-purple hover:bg-purple-600",
  secondary: "bg-brand-royal_blue hover:bg-blue-700",
};
function CustomLink({ children, href, variant }: Props) {
  return (
    <Link
      className={clsx(
        `${variants[variant]}`,
        ` grid place-content-center rounded-lg  transition-colors duration-200 font-bold text-sm text-brand-ghost_white h-10 px-6`,
        " lg:h-11"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
