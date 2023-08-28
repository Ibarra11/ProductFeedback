"use client";
import { use } from "react";

import { usePostsContext } from "../PostsProvider";
import { PostsPromise } from "@/types";
function PostsCount({ postsPromise }: { postsPromise: PostsPromise }) {
  const posts = use(postsPromise);
  const { getFilteredPosts } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  return <span className="text-lg font-bold">{currentPosts.length} Posts</span>;
}

export default PostsCount;
