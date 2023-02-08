import * as React from "react";
import { ButtonBase } from "@/types";
type Color = "purple" | "royal_blue" | "american_blue" | "tangerine";

function Button({
  children,
  className,
  ...rest
}: React.PropsWithChildren<ButtonBase<{}>>) {
  return (
    <button className={`rounded-lg py-3 px-6 ${className || ""}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
