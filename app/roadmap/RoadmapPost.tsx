import React from "react";
import clsx from "clsx";
import CommentIcon from "../components/CommentIcon";
import CounterButton from "../components/CounterButton";
import { ROADMAP_OPTIONS } from "../constants";
import Link from "next/link";
import { Post } from "../lib/prisma/Post";
import { Upvotes, User } from "@prisma/client";
function RoadmapPost({
  post_id,
  status,
  title,
  content,
  category,
  createdAt,
  _count: { comments, upvotes },
  user,
}: Post & {
  user: User & {
    Upvotes: Upvotes[];
  };
}) {
  const { border } = ROADMAP_OPTIONS[status];
  const upvote = user.Upvotes.find((upvote) => upvote.post_fk_id === post_id);

  return (
    <Link
      // @ts-ignore
      href={`/post/${post_id}`}
      className={clsx(
        `relative group border-t-[5px] ${border} flex flex-col `,
        "bg-white p-8 rounded-md"
      )}
    >
      <span className=" text-xs absolute top-2 right-4 text-slate-400">
        {createdAt}
      </span>
      <div className={clsx("mb-2 flex-1", "md:mb-6", "lg:mb-4")}>
        <h3
          className={clsx(
            "text-sm font-bold  text-brand-american_blue mb-2",
            "lg:text-lg lg:mb-1",
            `group-hover:text-brand-royal_blue transition-colors duration-200`
          )}
        >
          {title}
        </h3>
        <p className={clsx("text-sm text-brand-blue_gray", "lg:text-base ")}>
          {content}
        </p>
      </div>

      <div className="inline-block rounded-lg bg-brand-alice_blue px-4 py-1 text-brand-american_blue mb-4">
        <h4 className="text-sm text-brand-royal_blue font-semibold">
          {category}
        </h4>
      </div>
      <div className="flex justify-between items-center ">
        <CounterButton
          postId={post_id}
          userId={user.user_id}
          upvoteCount={upvotes}
          upvoteId={upvote && upvote.upvote_id}
          direction="row"
          value={upvotes}
        />
        <CommentIcon comments={comments} />
      </div>
    </Link>
  );
}

export default RoadmapPost;
