import Link, { LinkProps } from "next/link";
import clsx from "clsx";
function CustomLink({ children, href }: LinkProps<any>) {
  return (
    <Link
      className={clsx(
        ` grid place-content-center rounded-lg bg-brand-purple hover:bg-purple-600 transition-colors duration-200 font-bold text-sm text-brand-ghost_white h-10 px-6`,
        " lg:h-11"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
