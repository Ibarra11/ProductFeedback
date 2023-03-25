"use client";
import React from "react";
import clsx from "clsx";
import ProductRequestPost from "../ProductRequestPost";
import { Type_Post } from "@/app/lib/prisma/post";

function ProductRequestList({ posts }: { posts: Type_Post }) {
  return (
    <div className={clsx("flex flex-col gap-4", "lg:gap-5")}>
      {posts.map((post) => (
        <ProductRequestPost key={post.post_id} {...post} />
      ))}
    </div>
  );
}

export default ProductRequestList;
