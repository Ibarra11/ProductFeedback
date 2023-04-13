"use client";

import { usePostsContext } from "../PostsProvider";
import { Post } from "@/app/lib/prisma/post";
interface Props {
  posts: Post[];
}
function SuggestionCount() {
  const { posts } = usePostsContext();
  return <span className="text-lg font-bold">{posts.length} Posts</span>;
}

export default SuggestionCount;
