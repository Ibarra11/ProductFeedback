"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CounterButton from "../CounterButton";
import CommentIcon from "../CommentIcon";
import { CommentType, FeedbackCategories } from "@/types";
import clsx from "clsx";

interface Post {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  comments?: CommentType[];
  category: FeedbackCategories;
}
function ProductRequestPost({
  id,
  title,
  description,
  upvotes,
  comments,
  category,
}: Post) {
  const [value, setValue] = React.useState(upvotes);
  return (
    <Link href={`/post/${id}`}>
      <article className="group bg-white flex py-7 px-8  gap-10 rounded-xl">
        <CounterButton
          selected={true}
          className="z-10"
          direction="column"
          value={value}
          onClick={() => {
            setValue(value + 1);
          }}
        />

        <div className="flex-1">
          <h3
            className={clsx(
              `group-hover:text-brand-purple group-focus:text-brand-purple`,
              "text-brand-gray_blue text-lg font-bold mb-1"
            )}
          >
            {title}
          </h3>
          <p className=" text-base text-slate-500 mb-3">{description}</p>
          <span className="bg-brand-alice_blue  text-brand-royal_blue text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200">
            {category[0].toUpperCase() + category.slice(1)}
          </span>
        </div>
        <CommentIcon comments={comments ? comments.length : 0} />
      </article>
    </Link>
  );
}

export default ProductRequestPost;
