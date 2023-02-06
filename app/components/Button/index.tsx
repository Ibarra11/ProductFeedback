import * as React from "react";
import { ButtonBase } from "@/types";
type Color = "purple" | "royal_blue" | "american_blue" | "tangerine";

type ButtonProps = ButtonBase<{
  color: Color;
}>;

function Button({
  color,
  children,
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button {...rest} className={`bg-brand-${color} rounded-lg py-3 px-6`}>
      {children}
    </button>
  );
}

export default Button;
