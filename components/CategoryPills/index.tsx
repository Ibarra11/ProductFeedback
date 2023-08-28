"use client";
import React from "react";
import clsx from "clsx";
import Pill from "../Pill";
import { CATEGORY_VALUES } from "@/lib/constants";
import { Category } from "@prisma/client";

interface Props {
  handleClick: (category: Category) => void;
  categories: Category[];
  variant: "dark" | "light";
}

function CategoryPills({ handleClick, categories, variant }: Props) {
  return (
    <div className={clsx("flex flex-wrap gap-2")}>
      {CATEGORY_VALUES.map((localCategory, index) => {
        return (
          <Pill
            variant={variant}
            onClick={() => handleClick(localCategory)}
            key={index}
            selected={categories.some((category) => category === localCategory)}
          >
            {localCategory}
          </Pill>
        );
      })}
    </div>
  );
}

export default CategoryPills;
