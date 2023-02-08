"use client";
import React from "react";
import { SortByTypes } from "@/types";
interface SortContext {
  sortBy: SortByTypes;
  handleSortByChange: (sortBy: SortByTypes) => void;
}
const SortContext = React.createContext<SortContext | undefined>(undefined);

export function useSortContext() {
  const context = React.useContext(SortContext);
  if (!context) {
    throw new Error("must be used within a SortProvider!");
  }
  return context;
}

function SortProvider({ children }: React.PropsWithChildren) {
  const [sortBy, setSortBy] = React.useState<SortByTypes>("Most Upvotes");

  function handleSortByChange(sortBy: SortByTypes) {
    setSortBy(sortBy);
  }
  return (
    <SortContext.Provider value={{ sortBy, handleSortByChange }}>
      {children}
    </SortContext.Provider>
  );
}

export default SortProvider;
