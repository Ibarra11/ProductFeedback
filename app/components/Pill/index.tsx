import * as React from "react";
import clsx from "clsx";
import { ButtonBase } from "@/types";
type ButtonProps = ButtonBase<{
  selected: boolean;
}>;
function Pill({
  children,
  selected,
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(
        `${
          selected
            ? "bg-brand-royal_blue text-brand-ghost_white"
            : "bg-brand-alice_blue text-brand-royal_blue hover:bg-blue-100 focus:bg-blue-100"
        }`,
        "px-4 py-2 rounded-xl transition-all duration-200"
      )}
      {...rest}
    >
      <span
        className={clsx(
          "text-brand-american-blue transition-all duration-200",
          "active:text-brand-ghost_white"
        )}
      >
        {children}
      </span>
    </button>
  );
}

export default Pill;
