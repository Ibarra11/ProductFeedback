import * as React from "react";
import clsx from "clsx";
import { ButtonBase } from "@/types";
type ButtonProps = ButtonBase<{
  selected: boolean;
  variant: "light" | "dark";
}>;

const variants = {
  light: {
    selected: "bg-brand-royal_blue text-brand-ghost_white",
    default: "bg-brand-alice_blue text-brand-royal_blue hover:bg-blue-100",
  },
  dark: {
    selected: "bg-brand-purple text-brand-ghost_white",
    default:
      "bg-slate-900 text-slate-300 hover:bg-purple-500 hover:text-brand-ghost_white",
  },
};
function Pill({
  children,
  selected,
  variant,
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      className={clsx(
        selected ? variants[variant].selected : variants[variant].default,
        "px-4 h-[30px] rounded-xl transition-colors duration-200"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Pill;
