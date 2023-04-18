"use client";
import { Category, Status } from "@prisma/client";
import clsx from "clsx";
import { use } from "react";
import EmptySuggestionsView from "../EmptySuggestionsView";
import { usePostsContext } from "../PostsProvider";
import { motion } from "framer-motion";

import Post from "../Post";
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
  const { getFilteredPosts, filterCategory, sortValue } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  return (
    <div className={clsx("flex-1  px-6", "md:h-full md:px-0")}>
      {currentPosts.length > 0 ? (
        <motion.ul
          key={`${filterCategory}-${sortValue}`}
          initial="hidden"
          animate="show"
          variants={container}
          className={clsx("flex flex-col gap-4", "lg:gap-5")}
        >
          {currentPosts.map((post) => (
            <Post key={post.post_id} {...post} />
          ))}
        </motion.ul>
      ) : (
        <EmptySuggestionsView />
      )}
    </div>
  );
}

export default Posts;
