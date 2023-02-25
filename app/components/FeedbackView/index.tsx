"use client";
import { Post } from "@/types";
import React from "react";
import clsx from "clsx";
import data from "../../../data.json";
import EmptySuggestionsView from "../EmptySuggestionsView";
import ProductRequestList from "../ProductRequestList";
import { useFilterContext } from "../FilterProvider";
import { useSortContext } from "../SortProvider";
import { sortPosts } from "@/app/utils";

function FeedbackView() {
  const [posts, setPosts] = React.useState<Post[]>(
    data.productRequests as any as Post[]
  );

  const { filterCategory } = useFilterContext();
  const { sortBy } = useSortContext();

  console.log(sortBy);

  const filteredPost =
    filterCategory === "All"
      ? posts
      : posts.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );

  const displayedPosts = sortPosts(filteredPost, sortBy);
  console.log(displayedPosts);

  return (
    <div className={clsx(" flex-1 px-6 pb-14", " md:p-0 md:h-full  ")}>
      <div className="h-full w-full">
        {displayedPosts.length > 0 ? (
          <ProductRequestList posts={displayedPosts} />
        ) : (
          <EmptySuggestionsView />
        )}
      </div>
    </div>
  );
}

export default FeedbackView;
