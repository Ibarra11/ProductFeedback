"use client";
import clsx from "clsx";
import EmptySuggestionsView from "../EmptySuggestionsView";
import { usePostsContext } from "../PostsProvider";
import ProductRequestList from "../ProductRequestList";
function Posts() {
  const { posts, filterCategory, sortValue } = usePostsContext();
  return (
    <div className={clsx("flex-1 px-6", "md:h-full md:px-0")}>
      <div className="h-full w-full">
        {posts.length > 0 ? (
          <ProductRequestList
            key={`${filterCategory}-${sortValue}`}
            posts={posts}
          />
        ) : (
          <EmptySuggestionsView />
        )}
      </div>
    </div>
  );
}

export default Posts;
