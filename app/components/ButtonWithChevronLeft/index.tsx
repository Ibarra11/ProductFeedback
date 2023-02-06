import * as React from "react";
import { ChevronLeft } from "react-feather";
import { ButtonBase } from "@/types";
import clsx from "clsx";

type ButtonProps = ButtonBase<{ withBg: boolean }>;

function ButtonWithChevronLeft({
  withBg,
  children,
  ...rest
}: React.PropsWithChildren<ButtonProps>) {
  const bg = withBg ? `bg-brand-american_blue` : "";
  const fontColor = withBg ? "white" : `brand_american_blue`;
  const chevronColor = withBg ? "brand-alice_blue" : `brand-american_blue`;
  return (
    <button
      {...rest}
      className={clsx(
        `${bg} text-${fontColor}`,
        "flex gap-3 items-center justify-center text-brand rounded-lg py-4 px-9"
      )}
    >
      <span className={`text-${chevronColor}`}>
        <ChevronLeft size={16} />
      </span>
      <span
        className={`hover:underline hover:underline-offset-4 transition-all duration-400`}
      >
        {children}
      </span>
    </button>
  );
}

export default ButtonWithChevronLeft;
