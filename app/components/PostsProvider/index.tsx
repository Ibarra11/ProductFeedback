"use client";
import React from "react";
import { FilterCategories, SortByTypes } from "@/types";
import { Post } from "@/app/lib/prisma/post";
import { sortPosts } from "@/app/utils";
interface Context {
  handleFilterChange: (filter: FilterCategories) => void;
  handleSortByChange: (sortBy: SortByTypes) => void;
  filterCategory: FilterCategories;
  sortValue: SortByTypes;
  posts: Post[];
}

const PostsContext = React.createContext<Context | undefined>(undefined);

export function usePostsContext() {
  const context = React.useContext(PostsContext);
  if (!context) {
    throw new Error(
      "component must be rendered within a FilterContext provider."
    );
  }
  return context;
}

function PostsProvider({
  posts,
  children,
}: React.PropsWithChildren<{ posts: Post[] }>) {
  const [sortBy, setSortBy] = React.useState<SortByTypes>("Date Posted");
  const [filterCategory, setFilterCategory] =
    React.useState<FilterCategories>("All");
  function handleFilterChange(filter: FilterCategories) {
    setFilterCategory(filter);
  }
  function handleSortByChange(sortBy: SortByTypes) {
    setSortBy(sortBy);
  }

  const filteredPosts =
    filterCategory === "All"
      ? posts
      : posts.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );

  const displayedPosts = sortPosts(filteredPosts, sortBy);

  return (
    <PostsContext.Provider
      value={{
        posts: displayedPosts,
        handleFilterChange,
        handleSortByChange,
        filterCategory: filterCategory,
        sortValue: sortBy,
        // updatePosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;
