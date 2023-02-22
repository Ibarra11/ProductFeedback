"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import Select from "../Select";
import Button from "../Button";

import { useSortContext } from "../SortProvider";
function Header() {
  const { sortBy, handleSortByChange } = useSortContext();
  const router = useRouter();
  return (
    <header
      className={clsx(
        "flex items-center h-14 px-6 bg-brand-american_blue ",
        " lg:h-[72px]  lg:gap-8  lg:pr-4 lg:rounded-lg"
      )}
    >
      <div
        className={clsx(
          "hidden",
          "lg:flex lg:gap-4 lg:items-center  lg:text-brand-ghost_white"
        )}
      >
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
      <Button
        onClick={() => router.push("/new-feedback")}
        className="ml-auto bg-brand-purple font-bold text-sm text-brand-ghost_white"
      >
        + Add Feedback
      </Button>
    </header>
  );
}

export default Header;
