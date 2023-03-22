"use client";
import { Comment, Post } from "@prisma/client";
import React from "react";
import clsx from "clsx";
// import data from "../../../data.json";
import EmptySuggestionsView from "../EmptySuggestionsView";
import ProductRequestList from "../ProductRequestList";
import { useFilterContext } from "../FilterProvider";
import { useSortContext } from "../SortProvider";
import { sortPosts } from "@/app/utils";

function FeedbackPosts({
  posts,
}: {
  posts: (Post & { comments: Comment[] })[];
}) {
  // const [posts, setPosts] = React.useState<Post[]>(
  //   data.productRequests as any as Post[]
  // );

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
