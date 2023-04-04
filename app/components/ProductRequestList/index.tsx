"use client";
import React from "react";
import clsx from "clsx";
import ProductRequestPost from "../ProductRequestPost";
import { T_PostWithComemntCount } from "@/app/lib/prisma/post";
import { Upvotes, User } from "@prisma/client";
function ProductRequestList({
  posts,
  user,
}: {
  posts: T_PostWithComemntCount[];
  user: User & {
    Upvotes: Upvotes[];
  };
}) {
  return (
    <div className={clsx("flex flex-col gap-4", "lg:gap-5")}>
      {posts.map((post) => (
        <ProductRequestPost user={user} key={post.post_id} {...post} />
      ))}
    </div>
  );
}

export default ProductRequestList;
