import * as React from "react";
import clsx from "clsx";
import { ButtonBase } from "@/types";

function Button({
  children,
  className,
  ...rest
}: React.PropsWithChildren<ButtonBase<{}>>) {
  return (
    <button
      className={clsx(`rounded-lg h-10 px-6 ${className || ""}`, " lg:h-11")}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
