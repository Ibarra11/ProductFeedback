"use client";

import { ChevronUp } from "react-feather";
import clsx from "clsx";
import { ButtonBase } from "@/types";

type ButtonProps = ButtonBase<{
  value: number;
  direction: "row" | "column";
  selected: boolean;
  onClick: (...args: any) => void;
  post_id: number;
}>;
function CounterButton({
  value,
  onClick,
  className,
  direction,
  selected,
  post_id,
  ...rest
}: ButtonProps) {
  const flexDirection =
    direction === "column"
      ? "flex-col gap-1 items-center justify-center w-10 h-14"
      : "flex- gap-2 h-10 w-[69px] px-3 items-center";
  return (
    <button
      className={clsx(
        "counter-btn bg-brand-alice_blue flex rounded-lg",
        `${className ? className : ""}`,
        `${flexDirection}`,
        `${selected ? "bg-brand-royal_blue" : ""}`,
        " hover:bg-blue-100 focus:bg-blue-100 duration-200 transition-colors"
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      {...rest}
    >
      <span
        className={clsx(
          "flex w-full justify-center text-brand-american_blue",
          `${selected ? "text-white" : ""}`
        )}
      >
        <ChevronUp size={16} />
      </span>
      <span
        className={clsx(
          "text-sm font-bold text-brand-american_blue flex w-full justify-center",
          `${selected ? "text-white" : ""}`
        )}
      >
        {value}
      </span>
    </button>
  );
}

export default CounterButton;
