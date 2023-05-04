"use client";
import React from "react";
import * as S from "@radix-ui/react-select";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Check } from "react-feather";

interface Props<T extends string> {
  options: T[];
  selectText?: string;
  handleChange: (value: T) => void;
  currentValue: T;
  ariaLabel: string;
  variant: "header" | "form" | "roadmap";
  id: string;
}

const variants = {
  header: {
    trigger: {
      baseStyles: "text-brand-ghost_white py-2 px-2",
    },
  },
  form: {
    trigger: {
      baseStyles: " text-brand-american_blue bg-brand-alice_blue py-3 px-6 ",
    },
  },
  roadmap: {
    trigger: {
      baseStyles: "bg-gray-200 text-slate-700 py-2 px-2 ",
    },
  },
};

function Select<T extends string>({
  options,
  selectText,
  handleChange,
  currentValue,
  ariaLabel,
  variant,
  id,
}: Props<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { baseStyles } = variants[variant].trigger;
  return (
    <S.Root
      value={currentValue}
      onValueChange={(nextVal) => handleChange(nextVal as T)}
      onOpenChange={setIsOpen}
    >
      <S.Trigger
        id={id}
        className={clsx(
          baseStyles,
          isOpen && "opacity-75 bg-brand",
          `  text-sm rounded-md 
        inline-flex  items-center justify-between`,
          "md:text-base md:py-3",
          "focus:ring-blue-500 focus:ring-2 outline-none"
        )}
        aria-label={ariaLabel}
      >
        {selectText && (
          <span className={clsx("opacity-75 mr-2")}>{selectText}</span>
        )}

        <S.Value>{currentValue}</S.Value>
        <S.Icon className={clsx("ml-1 text-inherit")}>
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
