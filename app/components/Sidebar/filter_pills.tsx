"use client";
import React from "react";
import clsx from "clsx";
import Pill from "../Pill";
import { usePostsContext } from "../PostsProvider";
import { FILTER_CATEGORIES } from "@/app/constants";

function FilterPills({ closeNavModal }: { closeNavModal?: () => void }) {
  const { handleFilterChange, filterCategory } = usePostsContext();
  return (
    <div
      className={clsx(
        "md:flex-1 bg-white pl-6 pt-6 pr-4 pb-9 flex flex-wrap gap-2 rounded-lg",
        "lg:flex-initial"
      )}
    >
      {FILTER_CATEGORIES.map((filter, index) => {
        return (
          <Pill
            onClick={() => {
              handleFilterChange(filter);
              if (closeNavModal) {
                closeNavModal();
              }
            }}
            key={index}
            selected={filterCategory === filter}
          >
            {filter}
          </Pill>
        );
      })}
    </div>
  );
}

export default FilterPills;

//   <button
//             className={clsx(
//               "px-4 py-1",
//               `${
//                 filter === currentFilter
//                   ? "bg-brand-royal_blue text-brand-ghost_white"
//                   : "bg-brand-alice_blue text-brand-american_blue"
//               }`
//             )}
//             onClick={() => setCurrentFilter(filter)}
//             key={index}
//           >
//             {filter}
//           </button>
