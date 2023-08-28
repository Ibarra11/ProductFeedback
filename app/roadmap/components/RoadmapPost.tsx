import React from "react";
import clsx from "clsx";
import { ROADMAP_OPTIONS } from "@/app/constants";
import Link from "next/link";
import CommentIcon from "@/components/CommentIcon";
import UpvoteButton from "@/components/UpvoteButton";
import { Roadmap_Post } from "../page";
import { getCurrentUser } from "@/lib/auth/session";
async function RoadmapPost({
  id,
  status,
  title,
  content,
  category,
  createdAt,
  _count: { comments },
  upvotes,
}: Roadmap_Post) {
  const user = await getCurrentUser();
  const { border } = ROADMAP_OPTIONS[status];
  console.log(border);
  const upvote = upvotes.find((upvote) => upvote.user_id === user.id);
  return (
    <Link
      href={`/post/${id}`}
      className={clsx(
        `relative group border-t-[5px] ${border} flex flex-col `,
        "bg-white p-8 rounded-md"
      )}
    >
      <span className=" text-xs absolute top-2 right-4 text-slate-400">
        {new Date(createdAt)
          .toLocaleString("en-us", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .split(", ")
          .join(" ")}
        <br />
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
      <h4 className=" self-start text-sm text-brand-royal_blue font-semibold rounded-lg bg-brand-alice_blue px-4 py-1 t mb-4">
        {category}
      </h4>
      <div className="flex justify-between items-center ">
        <UpvoteButton
          postId={id}
          userId={user.id}
          upvoteCount={upvotes.length}
          upvoteId={upvote && upvote.id}
          direction="row"
        />
        <CommentIcon comments={comments} />
      </div>
    </Link>
  );
}

export default RoadmapPost;
