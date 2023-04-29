"use client";
import React from "react";
import clsx from "clsx";
import Pill from "../Pill";
import { CATEGORY_VALUES } from "@/app/constants";
import { Category } from "@prisma/client";

interface Props {
  handleClick: (category: Category) => void;
  categories: Category[];
}

function CategoryPills({ handleClick, categories }: Props) {
  return (
    <div className={clsx("flex flex-wrap gap-2")}>
      {CATEGORY_VALUES.map((localCategory, index) => {
        return (
          <Pill
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
