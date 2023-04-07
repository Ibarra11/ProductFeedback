"use client";
import React from "react";
import Link from "next/link";
import CounterButton from "../CounterButton";
import CommentIcon from "../CommentIcon";
import clsx from "clsx";
import type { T_PostWithComemntCount } from "@/app/lib/prisma/post";
import { useUserContext } from "../UserProvider";
import { formatStatus } from "@/app/utils";
import { ROADMAP_OPTIONS } from "@/app/constants";

function ProductRequestPost({
  post_id,
  title,
  content,
  category,
  status,
  _count: { comments, upvotes },
}: T_PostWithComemntCount) {
  const [disableAnimation, setDisableAnimation] = React.useState(false);
  const user = useUserContext();
  const upvote = user.Upvotes.find((upvote) => upvote.post_fk_id === post_id);

  React.useEffect(() => {
    // if were on /post/10, disable animation
    const isPostRoute = window.location.pathname.includes("post");
    console.log(window.location.pathname);
    console.log(isPostRoute);
    setDisableAnimation(isPostRoute);
  }, []);

  return (
    <Link href={`/post/${post_id}`}>
      <article
        className={clsx(
          !disableAnimation && "group",
          "bg-white flex  py-7 px-8  gap-10 rounded-xl"
        )}
      >
        <CounterButton
          postId={post_id}
          userId={user.user_id}
          upvoteId={upvote && upvote.upvote_id}
          className="z-10"
          direction="column"
          upvoteCount={upvotes}
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
          <p className=" text-base text-slate-500 mb-3">{content}</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="inline-block bg-brand-alice_blue  text-brand-royal_blue text-sm font-semibold px-4 py-2 rounded-xl">
                {category[0] + category.slice(1).toLowerCase()}
              </span>
              <Status status={status} />
            </div>

            <div className={clsx("flex items-center gap-2", "md:hidden")}>
              <CommentIcon comments={comments} />
            </div>
          </div>
        </div>
        <div className={clsx("hidden", "md:flex md:items-center md:gap-2")}>
          <CommentIcon comments={comments} />
        </div>
      </article>
    </Link>
  );
}

function Status({ status }: { status: T_PostWithComemntCount["status"] }) {
  const { bgWithOpacity, text } = ROADMAP_OPTIONS[status];
  return (
    <span
      className={clsx(
        "inline-block  text-sm font-bold px-4 py-2 rounded-xl",
        `${bgWithOpacity} ${text} `
      )}
    >
      {formatStatus(status)}
    </span>
  );
}

export default ProductRequestPost;
