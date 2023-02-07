"use client";

import { ChevronUp } from "react-feather";
import clsx from "clsx";
import { ButtonBase } from "@/types";

type ButtonProps = ButtonBase<{
  value: number;
  onClick: (...args: any) => void;
}>;
function CounterButton({ value, onClick, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-brand-alice_blue flex flex-col justify-center self-start rounded-xl px-3 py-2"
      )}
      onClick={onClick}
      {...rest}
    >
      <span className="flex w-full justify-center text-brand-royal-blue">
        <ChevronUp size={16} />
      </span>
      <span className=" text-sm text-brand-american-blue flex w-full justify-center">
        {value}
      </span>
    </button>
  );
}

export default CounterButton;
