import * as React from "react";
import clsx from "clsx";
import { ButtonProps } from "@/types";
import { LinkProps } from "next/link";

type X = LinkProps<{
  href: "/roadmap" | "/post";
}>;
function Button({
  children,
  className,
  as,
  ...rest
}: React.PropsWithChildren<ButtonProps<{ as?: string }>>) {
  return (
    <button
      className={clsx(
        `inline-block rounded-lg h-10 px-6 ${className || ""}`,
        " lg:h-11"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
