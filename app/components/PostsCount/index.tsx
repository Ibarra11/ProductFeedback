"use client";
import { use } from "react";
import { Category, Status } from "@prisma/client";
import { usePostsContext } from "../PostsProvider";

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
function PostsCount({ postsPromise }: Props) {
  const posts = use(postsPromise);
  const { getFilteredPosts } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  return <span className="text-lg font-bold">{currentPosts.length} Posts</span>;
}

export default PostsCount;
