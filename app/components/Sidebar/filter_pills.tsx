"use client";
import React from "react";
import clsx from "clsx";
import Pill from "../Pill";
import { FILTER_LIST } from "@/constants";
import { FilterList } from "@/types";
function FilterPills() {
  const [currentFilter, setCurrentFilter] = React.useState<FilterList>("All");
  return (
    <div className="bg-white flex flex-wrap gap-2 p-6 rounded-lg">
      {FILTER_LIST.map((filter, index) => {
        return (
          <Pill
            onClick={() => setCurrentFilter(filter)}
            key={index}
            selected={currentFilter === filter}
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
