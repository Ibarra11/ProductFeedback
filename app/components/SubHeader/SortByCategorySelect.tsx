"use client";
import { usePostsContext } from "../PostsProvider";
import { SORT_OPTIONS } from "@/app/constants";
import Select from "../Select";

function SortByCategorySelect() {
  const { handleSortByChange, sortValue } = usePostsContext();
  return (
    <Select
      options={SORT_OPTIONS}
      handleChange={handleSortByChange}
      currentValue={sortValue}
      selectText="Sort by:"
      variant="header"
      ariaLabel="Sort post by category"
    />
  );
}
export default SortByCategorySelect;
