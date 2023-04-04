"use client";
import { use } from "react";
import clsx from "clsx";
import { getAllPost } from "@/app/lib/prisma/post";
import { Prisma, Post, Upvotes } from "@prisma/client";
import FeedbackPosts from "./FeedbackPosts";
import { User } from "@prisma/client";
interface Props {
  postsPromise: Prisma.PrismaPromise<
    (Post & {
      _count: {
        comments: number;
        upvotes: number;
      };
    })[]
  >;
  user: User & {
    Upvotes: Upvotes[];
  };
}
function FeedbackPostsContainer({ postsPromise, user }: Props) {
  const posts = use(postsPromise);
  console.log("FeedbackPostCOntainer");
  console.log(user);
  return (
    <div className={clsx("flex-1 px-6", "md:h-full md:px-0")}>
      <div className="h-full w-full">
        <FeedbackPosts user={user} posts={posts} />
      </div>
    </div>
  );
}

export default FeedbackPostsContainer;
