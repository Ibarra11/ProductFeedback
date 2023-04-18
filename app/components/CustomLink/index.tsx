import Link, { LinkRestProps } from "next/link";
import clsx from "clsx";
import { LinkProps } from "next/link";
import { RouteType } from "next/dist/lib/load-custom-routes";
function CustomLink({
  children,
  href,
  className,
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className: string;
  href: LinkProps<RouteType>["href"];
}) {
  return (
    <Link
      className={clsx(
        ` grid place-content-center rounded-lg bg-brand-purple font-bold text-sm text-brand-ghost_white h-10 px-6`,
        " lg:h-11",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
