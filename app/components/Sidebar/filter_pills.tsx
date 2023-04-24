"use client";
import React from "react";
import clsx from "clsx";
import Pill from "../Pill";
import { usePostsContext } from "../PostsProvider";
import { FILTER_CATEGORIES } from "@/app/constants";

function FilterPills() {
  const { handleFilterChange, filters } = usePostsContext();
  return (
    <div className="bg-white md:flex-1 p-6 pt-4  lg:flex-initial rounded-lg">
      <h2 className="mb-4 text-lg text-brand-american_blue font-bold">Tags</h2>
      <div className={clsx("flex flex-wrap gap-2")}>
        {FILTER_CATEGORIES.map((category, index) => {
          return (
            <Pill
              onClick={() => {
                handleFilterChange(category);
              }}
              key={index}
              selected={filters.some(
                (filter) => filter.toLowerCase() === category.toLowerCase()
              )}
            >
              {category}
            </Pill>
          );
        })}
      </div>
    </div>
  );
}

export default FilterPills;
