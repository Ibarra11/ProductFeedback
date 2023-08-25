import Link from "next/link";
type Props = ComponentProps<"a"> & {
  variant: "primary" | "secondary";
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
        ` grid h-10 place-content-center  rounded-lg px-6 text-sm font-bold text-brand-ghost_white transition-colors duration-200`,
        " lg:h-11"
      )}
      // @ts-ignore
      href={href}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
