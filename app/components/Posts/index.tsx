"use client";
import { Category, Status } from "@prisma/client";
import clsx from "clsx";
import { use } from "react";
import EmptySuggestionsView from "../EmptySuggestionsView";
import { usePostsContext } from "../PostsProvider";
import ProductRequestList from "../ProductRequestList";
interface Props {
  postsPromise: Promise<
    {
      createdAt: string;
      post_id: number;
      title: string;
      content: string;
      category: Category;
      status: Status;
      user_fk_id: number;
      _count: {
        comments: number;
        upvotes: number;
      };
    }[]
  >;
}
function Posts({ postsPromise }: Props) {
  const posts = use(postsPromise);
  const { getFilteredPosts, filterCategory, sortValue } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  return (
    <div className={clsx("flex-1 px-6", "md:h-full md:px-0")}>
      <div className="h-full w-full">
        {currentPosts.length > 0 ? (
          <ProductRequestList
            key={`${filterCategory}-${sortValue}`}
            posts={currentPosts}
          />
        ) : (
          <EmptySuggestionsView />
        )}
      </div>
    </div>
  );
}

export default Posts;
