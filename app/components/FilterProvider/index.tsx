"use client";
import React from "react";
import { FilterCategories } from "@/types";
interface Context {
  filterCategory: FilterCategories;
  handleFilterChange: (filter: FilterCategories) => void;
}

const FilterContext = React.createContext<Context | undefined>(undefined);

export function useFilterContext() {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error(
      "component must be rendered within a FilterContext provider."
    );
  }
  return context;
}

function FilterProvider({ children }: React.PropsWithChildren) {
  const [filterCategory, setFilterCategory] =
    React.useState<FilterCategories>("All");

  function handleFilterChange(filter: FilterCategories) {
    setFilterCategory(filter);
  }
  return (
    <FilterContext.Provider value={{ filterCategory, handleFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
