import Link from "next/link";
import clsx from "clsx";

function CustomLink({
  children,
  href,
}: React.PropsWithChildren<
  { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>) {
  return (
    <Link
      className={clsx(
        ` grid place-content-center rounded-lg bg-brand-purple font-bold text-sm text-brand-ghost_white h-10 px-6`,
        " lg:h-11"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
export default CustomLink;
