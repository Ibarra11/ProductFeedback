"use client";
import React from "react";
import clsx from "clsx";
import ProductRequestPost from "../ProductRequestPost";
import { Post } from "@/app/lib/prisma/post";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

function ProductRequestList({ posts }: { posts: Post[] }) {
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={container}
      className={clsx("flex flex-col gap-4", "lg:gap-5")}
    >
      {posts.map((post) => (
        <ProductRequestPost key={post.post_id} {...post} />
      ))}
    </motion.ul>
  );
}

export default ProductRequestList;
