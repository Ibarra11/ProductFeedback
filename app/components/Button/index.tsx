import * as React from "react";

import { ButtonHTMLAttributes } from "react";
type Color = "purple" | "royal_blue" | "american_blue" | "tangerine";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
}

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
