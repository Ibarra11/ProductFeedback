"use client";
import Image from "next/image";
import Select from "../Select";
import Button from "../Button";

import { useSortContext } from "../SortProvider";
function Header() {
  const { sortBy, handleSortByChange } = useSortContext();
  return (
    <header className="flex items-center h-[72px] bg-brand-american_blue gap-8 pl-6 pr-4 rounded-lg">
      <div className="flex gap-4 items-center  text-brand-ghost_white">
        <Image
          width={24}
          height={24}
          src="/suggestions/icon-suggestions.svg"
          alt=""
          aria-hidden
        />
        <span className="text-lg font-bold">O Suggestions</span>
      </div>
      <Select
        options={[
          "Most Upvotes",
          "Least Upvotes",
          "Most Comments",
          "Least Comments",
        ]}
        value={sortBy}
        selectText="Sort by:"
        className="text-brand-ghost_white"
        arrowColor="ghost_white"
        handleValueChange={handleSortByChange}
      />
      <Button className="ml-auto bg-brand-purple font-bold text-sm text-brand-ghost_white">
        + Add Feedback
      </Button>
    </header>
  );
}

export default Header;