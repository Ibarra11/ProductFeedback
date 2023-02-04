import * as React from "react";

import { ButtonHTMLAttributes } from "react";
type Color = "purple" | "royal_blue" | "american_blue" | "tangerine";

type ButtonProps = ButtonHTMLAttributes<{ color: Color }>;

function Button({
  color,
  children,
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button {...rest} className="rounded-lg">
      {children}
    </button>
  );
}

export default Button;
