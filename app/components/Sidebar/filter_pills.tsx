"use client";
import React from "react";
import Pill from "../Pill";
import { useFilterContext } from "../FilterProvider";
import { FILTER_LIST } from "@/constants";

function FilterPills() {
  const { handleFilterChange, filterCategory } = useFilterContext();
  return (
    <div className="bg-white flex flex-wrap gap-2 p-6 rounded-lg">
      {FILTER_LIST.map((filter, index) => {
        return (
          <Pill
            onClick={() => handleFilterChange(filter)}
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
