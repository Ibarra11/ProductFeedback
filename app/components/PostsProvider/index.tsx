"use client";
import React from "react";
import { FeedbackCategories, FilterCategories, SortByTypes } from "@/types";
import { Post } from "@/app/lib/prisma/post";
import { sortPosts } from "@/app/utils";
interface Context {
  handleFilterChange: (filter: FilterCategories | FilterCategories[]) => void;
  handleSortByChange: (sortBy: SortByTypes) => void;
  filters: FeedbackCategories[];
  sortValue: SortByTypes;
  getFilteredPosts: (posts: Post[]) => Post[];
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

function PostsProvider({ children }: React.PropsWithChildren) {
  const [sortBy, setSortBy] = React.useState<SortByTypes>("Date Posted");
  const [filters, setFilters] = React.useState<FilterCategories[]>([]);
  function handleFilterChange(
    filterArg: FilterCategories | FilterCategories[]
  ) {
    console.log(filterArg);
    if (Array.isArray(filterArg)) {
      setFilters(filterArg);
    } else {
      if (filters.includes(filterArg)) {
        const nextFilters = filters.filter((filter) => filter !== filterArg);
        setFilters(nextFilters);
        return;
      } else {
        setFilters([...filters, filterArg]);
      }
    }
  }
  function handleSortByChange(sortBy: SortByTypes) {
    setSortBy(sortBy);
  }

  function getFilteredPosts(posts: Post[]) {
    const filteredPosts =
      filters.length > 0
        ? posts.filter((post) => {
            return filters.some(
              (filter) => filter.toLowerCase() === post.category.toLowerCase()
            );
          })
        : posts;

    const displayedPosts = sortPosts(filteredPosts, sortBy);
    return displayedPosts;
  }

  return (
    <PostsContext.Provider
      value={{
        getFilteredPosts,
        handleFilterChange,
        handleSortByChange,
        filters: filters,
        sortValue: sortBy,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;
