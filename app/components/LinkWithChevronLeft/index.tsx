import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "react-feather";

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
        "inline-flex items-center gap-3  py-2",
        `${className ? className : ""}`
      )}
    >
      <span>
        <ChevronLeft size={16} />
      </span>
      <span
        className={clsx(
          "hover:underline hover:underline-offset-4 transition-all duration-200",
          "focus:underline focus:underline-offset-4"
        )}
      >
        {children}
      </span>
    </Link>
  );
}

export default LinkWithChevronLeft;
