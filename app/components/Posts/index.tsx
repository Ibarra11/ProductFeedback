"use client";
import React from "react";
import clsx from "clsx";
import { use } from "react";
import EmptySuggestionsView from "../EmptySuggestionsView";
import Post from "../Post";
import { usePostsContext } from "../PostsProvider";

import PostSkeleton from "../PostSkeleton";
import AnimatedPost from "../Post/AnimatedPost";
import { PostsPromise } from "@/types";

interface Props {
  postsPromise: PostsPromise;
}

function Posts({ postsPromise }: Props) {
  const posts = use(postsPromise);
  const { getFilteredPosts, filters, sortValue } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);

  return (
    <div className={clsx("flex-1  px-6", "md:h-full md:px-0")}>
      {currentPosts.length > 0 ? (
        <ul
          key={`${filters.join("")}-${sortValue}`}
          className={clsx("flex flex-col gap-4", "lg:gap-5")}
        >
          {currentPosts.map((post) => (
            <AnimatedPost key={post.id}>
              <Post {...post} />
            </AnimatedPost>
          ))}
        </ul>
      ) : (
        <EmptySuggestionsView />
      )}
    </div>
  );
}

function PostsSuspense({ postsPromise }: Props) {
  return (
    <React.Suspense fallback={<PostSkeleton posts={5} />}>
      <Posts postsPromise={postsPromise} />
    </React.Suspense>
  );
}

export default PostsSuspense;
