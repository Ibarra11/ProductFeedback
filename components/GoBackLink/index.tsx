"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "react-feather";

import clsx from "clsx";

function GoBackLink({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button
      className={clsx("group inline-flex  items-center gap-3 py-2", className)}
      onClick={() => router.back()}
    >
      <ChevronLeft
        className="group-hover:-translate-x-1 group-focus:-translate-x-1 transition-transform duration-200"
        size={16}
      />

      <span
        className={clsx(
          "group-hover:underline group-hover:underline-offset-4 transition-all duration-200",
          "group-focus:underline group-focus:underline-offset-4"
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default GoBackLink;
