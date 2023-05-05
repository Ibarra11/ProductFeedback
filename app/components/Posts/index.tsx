"use client";
import React from "react";
import { Category, Status } from "@prisma/client";
import clsx from "clsx";
import { use } from "react";
import EmptySuggestionsView from "../EmptySuggestionsView";
import { usePostsContext } from "../PostsProvider";
import { motion } from "framer-motion";
import PostSkeleton from "../PostSkeleton";
import AnimatedPost from "../Post/AnimatedPost";
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
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
function Posts({ postsPromise }: Props) {
  const posts = use(postsPromise);
  const { getFilteredPosts, filters, sortValue } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  return (
    <div className={clsx("flex-1  px-6", "md:h-full md:px-0")}>
      {currentPosts.length > 0 ? (
        <motion.ul
          key={`${filters.join("")}-${sortValue}`}
          initial="hidden"
          animate="show"
          variants={container}
          className={clsx("flex flex-col gap-4", "lg:gap-5")}
        >
          {currentPosts.map((post) => (
            <AnimatedPost key={post.post_id} {...post} />
          ))}
        </motion.ul>
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
