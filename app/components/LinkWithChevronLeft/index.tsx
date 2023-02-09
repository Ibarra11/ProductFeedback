import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "react-feather";
import { ButtonBase } from "@/types";
import clsx from "clsx";

function LinkWithChevronLeft({
  className,
  href,
  children,
}: React.PropsWithChildren<{ className?: string; href: string }>) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex text-brand-american_blue gap-3 items-center justify-center py-4 px-9",
        `${className ? className : ""}`
      )}
    >
      <span className={`text-brand-american_blue`}>
        <ChevronLeft size={16} />
      </span>
      <span
        className={`hover:underline hover:underline-offset-4 transition-all duration-400`}
      >
        {children}
      </span>
    </Link>
  );
}

export default LinkWithChevronLeft;
