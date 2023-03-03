"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "react-feather";

import clsx from "clsx";

function LinkWithChevronLeft({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-3  py-2",
        `${className ? className : ""}`
      )}
      onClick={() => router.back()}
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
    </button>
  );
}

export default LinkWithChevronLeft;
