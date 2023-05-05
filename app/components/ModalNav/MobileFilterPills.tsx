"use client";
import React from "react";
import clsx from "clsx";
import { CATEGORY_VALUES } from "@/app/constants";
import Pill from "../Pill";
import { usePostsContext } from "../PostsProvider";
function MobileFilterPills({ closeNavModal }: { closeNavModal: () => void }) {
  const { handleFilterChange, filters } = usePostsContext();
  const [localFilters, setLocalFilters] = React.useState(filters);
  return (
    <div className="bg-white md:flex-1 p-6 pt-4  lg:flex-initial rounded-lg">
      <h2 className="mb-4 text-lg text-brand-american_blue font-bold">Tags</h2>
      <div className={clsx("flex flex-wrap gap-2 mb-4")}>
        {CATEGORY_VALUES.map((category, index) => {
          return (
            <Pill
              variant="light"
              onClick={() => {
                if (localFilters.includes(category)) {
                  const nextFilters = localFilters.filter(
                    (filter) => filter !== category
                  );
                  setLocalFilters(nextFilters);
                  return;
                }
                setLocalFilters([...localFilters, category]);
              }}
              key={index}
              selected={localFilters.some(
                (filter) => filter.toLowerCase() === category.toLowerCase()
              )}
            >
              {category}
            </Pill>
          );
        })}
      </div>
      <button
        onClick={() => {
          handleFilterChange(localFilters);
          closeNavModal();
        }}
        className="py-2 px-4 rounded-md bg-slate-500 text-brand-ghost_white hover:bg-slate-700 transition-colors duration-200 text-sm"
      >
        Show Posts
      </button>
    </div>
  );
}

export default MobileFilterPills;
