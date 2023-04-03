"use client";
import { use } from "react";
import clsx from "clsx";
import { getAllPost } from "@/app/lib/prisma/post";
import { Prisma, Post } from "@prisma/client";
import FeedbackPosts from "./FeedbackPosts";
interface Props {
  postsPromise: Prisma.PrismaPromise<
    (Post & {
      _count: {
        comments: number;
      };
    })[]
  >;
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
