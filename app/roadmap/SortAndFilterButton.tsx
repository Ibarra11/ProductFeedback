"use client";
import React from "react";
import clsx from "clsx";
import { BiSortAlt2 } from "react-icons/bi";
function SortAndFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2  bg-gray-200 p-2 rounded-md shadow-sm text-sm text-slate-700 transition-opacity duration-200"
      )}
    >
      <BiSortAlt2 />
      <span>Sort & Filter</span>
    </button>
  );
}
export default SortAndFilterButton;
