"use client";
import React from "react";
import * as S from "@radix-ui/react-select";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Check } from "react-feather";

interface Props<T extends string> {
  options: T[];
  selectText?: string;
  className?: string;
  arrowColor: "ghost_white" | "american_blue";
  handleChange: (value: T) => void;
  currentValue: T;
}
function Select<T extends string>({
  options,
  selectText,
  arrowColor,
  className,
  handleChange,
  currentValue,
}: Props<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <S.Root
      value={currentValue}
      onValueChange={(nextVal) => handleChange(nextVal as T)}
      onOpenChange={setIsOpen}
    >
      <S.Trigger
        className={clsx(
          `${className ? className : ""} ${isOpen ? "opacity-75" : ""}`,
          `px-6 py-3 text-base rounded-md
        inline-flex  items-center justify-between`,
          "focus:ring-2 hover:ring-2  ring-brand-american_blue  outline-none"
        )}
        aria-label="Sort"
      >
        {selectText && (
          <span className=" text-brand-american_blue opacity-75 mr-1">
            {selectText}
          </span>
        )}
        <S.Value>{currentValue}</S.Value>
        <S.Icon className={`ml-1 text-brand-${arrowColor}`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </S.Icon>
      </S.Trigger>
      <S.Portal>
        <S.Content
          position="popper"
          align="start"
          className="hidden bg-white rounded-md mt-4 shadow-xl z-20"
        >
          <S.Viewport className="rounded-md">
            {options.map((item, index) => (
              <S.Item
                className={clsx(
                  "flex items-center py-3 px-6 outline-none justify-between ",
                  `${
                    item !== currentValue
                      ? "hover:text-brand-purple focus:text-brand-purple "
                      : ""
                  }`,
                  `${
                    index !== options.length - 1
                      ? "border-b-2 border-brand-alice_blue"
                      : ""
                  }`
                )}
                disabled={item === currentValue}
                key={`${item}-${index}`}
                value={item}
              >
                <S.ItemText>{item}</S.ItemText>
                {item === currentValue && (
                  <S.ItemIndicator className="text-brand-purple">
                    <Check size={16} />
                  </S.ItemIndicator>
                )}
              </S.Item>
            ))}
          </S.Viewport>
        </S.Content>
      </S.Portal>
    </S.Root>
  );
}

export default Select;
