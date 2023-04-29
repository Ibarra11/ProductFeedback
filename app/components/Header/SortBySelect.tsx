"use client";
import { usePostsContext } from "../PostsProvider";
import { SORT_OPTIONS } from "@/app/constants";
import Select from "../Select";

function SortBySelect() {
  const { handleSortByChange, sortValue } = usePostsContext();
  return (
    <Select
      options={SORT_OPTIONS}
      handleChange={handleSortByChange}
      currentValue={sortValue}
      selectText="Sort by:"
      className="text-brand-ghost_white"
      arrowColor="ghost_white"
    />
  );
}
export default SortBySelect;
