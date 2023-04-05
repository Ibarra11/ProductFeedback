import React from "react";
import EmptySuggestionsView from "../EmptySuggestionsView";
import ProductRequestList from "../ProductRequestList";
import { useFilterContext } from "../FilterProvider";
import { useSortContext } from "../SortProvider";
import type { T_PostWithComemntCount } from "@/app/lib/prisma/post";
import { sortPosts } from "@/app/utils";

function FeedbackPosts({ posts }: { posts: T_PostWithComemntCount[] }) {
  const { filterCategory } = useFilterContext();
  const { sortBy } = useSortContext();

  const filteredPosts =
    filterCategory === "All"
      ? posts
      : posts.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );

  const displayedPosts = sortPosts(filteredPosts, sortBy);
  return (
    <>
      {displayedPosts.length > 0 ? (
        <ProductRequestList posts={filteredPosts} />
      ) : (
        <EmptySuggestionsView />
      )}
    </>
  );
}

export default FeedbackPosts;
