"use client";
import { use } from "react";
import clsx from "clsx";
import FeedbackPosts from "./FeedbackPosts";
import { Post } from "@/app/lib/prisma/post";
interface Props {
  postsPromise: Promise<Post[]>;
}
function FeedbackPostsContainer({ postsPromise }: Props) {
  const posts = use(postsPromise);

  return (
    <div className={clsx("flex-1 px-6", "md:h-full md:px-0")}>
      <div className="h-full w-full">
        <FeedbackPosts posts={posts} />
      </div>
    </div>
  );
}

export default FeedbackPostsContainer;
