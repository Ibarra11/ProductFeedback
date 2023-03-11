"use client";
import React from "react";
import clsx from "clsx";
import ProductRequestPost from "../ProductRequestPost";

import { Post } from "@prisma/client";

function ProductRequestList({ posts }: { posts: Post[] }) {
  return (
    <div className={clsx("flex flex-col gap-4", "lg:gap-5")}>
      {posts.map((post) => (
        <ProductRequestPost key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProductRequestList;
