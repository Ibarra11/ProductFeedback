import React from "react";
import clsx from "clsx";
import EmptySuggestionsView from "../EmptySuggestionsView";
import ProductRequestList from "../ProductRequestList";
import { useFilterContext } from "../FilterProvider";
import { useSortContext } from "../SortProvider";
import type { T_PostWithComemntCount } from "@/app/lib/prisma/post";
import { sortPosts } from "@/app/utils";
import { User, Upvotes } from "@prisma/client";

function FeedbackPosts({
  posts,
  user,
}: {
  posts: T_PostWithComemntCount[];
  user: User & {
    Upvotes: Upvotes[];
  };
}) {
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
  console.log("Feedback Posts");
  console.log(user);
  return (
    <>
      {displayedPosts.length > 0 ? (
        <ProductRequestList user={user} posts={filteredPosts} />
      ) : (
        <EmptySuggestionsView />
      )}
    </>
  );
}

export default FeedbackPosts;
