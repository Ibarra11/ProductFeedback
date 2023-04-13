"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import Select from "../Select";
import Button from "../Button";
import { usePostsContext } from "../PostsProvider";

function Header() {
  const router = useRouter();
  const { posts, sortValue, handleSortByChange } = usePostsContext();
  return (
    <header
      className={clsx(
        "flex items-center h-14 px-6 bg-brand-american_blue",
        "md:h-[72px] md:gap-9 md:rounded-lg md:pr-3",
        "lg:gap-8 lg:pr-4"
      )}
    >
      <div
        className={clsx(
          "hidden",
          "md:flex md:gap-4 md:items-center  md:text-brand-ghost_white"
        )}
      >
        <Image
          width={24}
          height={24}
          src="/suggestions/icon-suggestions.svg"
          alt=""
          aria-hidden
        />
        <span className="text-lg font-bold">{posts.length} Posts</span>
      </div>
      <Select
        options={[
          "Most Upvotes",
          "Least Upvotes",
          "Most Comments",
          "Least Comments",
        ]}
        value={sortValue}
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
