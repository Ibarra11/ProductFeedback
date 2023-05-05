"use client";
import React from "react";
import Link from "next/link";
import CounterButton from "../CounterButton";
import CommentIcon from "../CommentIcon";
import clsx from "clsx";
import type { Post } from "@/app/lib/prisma/post";
import { useUserContext } from "../UserProvider";
import { formatStatus } from "@/app/utils";
import { ROADMAP_OPTIONS } from "@/app/constants";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  },
};

function Post({
  post_id,
  title,
  content,
  category,
  status,
  createdAt,
  _count: { comments, upvotes },
}: Post) {
  const [disableAnimation, setDisableAnimation] = React.useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const user = useUserContext();
  const upvote = user.Upvotes.find((upvote) => upvote.post_fk_id === post_id);
  React.useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [inView, controls]);

  React.useEffect(() => {
    // if were on /post/10, disable animation
    const isPostRoute = window.location.pathname.includes("post");
    setDisableAnimation(isPostRoute);
  }, []);

  return (
    <motion.li
      variants={variants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {/* @ts-ignore */}
      <Link href={`/post/${post_id}`}>
        <article
          className={clsx(
            !disableAnimation && "group",
            "bg-white p-6 md:py-7 md:px-8 rounded-xl"
          )}
        >
          <div className="text-right mb-2">
            <p className="text-sm text-slate-400">{createdAt}</p>
          </div>
          <div className="flex sm:gap-10  md:gap-6">
            <div className="hidden sm:block">
              <CounterButton
                postId={post_id}
                userId={user.user_id}
                upvoteId={upvote && upvote.upvote_id}
                className="z-10"
                direction="column"
                upvoteCount={upvotes}
              />
            </div>
            <div className="flex-1 space-y-2 md:space-y-3">
              <div className="space-y-2 md:space-y-1">
                <h3
                  className={clsx(
                    `group-hover:text-brand-purple group-focus:text-brand-purple`,
                    " text-sm text-brand-gray_blue font-bold",
                    " md:text-lg"
                  )}
                >
                  {title}
                </h3>
                <p className={clsx("text-sm text-slate-500", "md:text-base ")}>
                  {content}
                </p>
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <span
                  className={clsx(
                    "inline-block bg-brand-alice_blue  text-brand-royal_blue text-xs font-semibold px-4 py-2 rounded-xl",
                    "md:text-sm"
                  )}
                >
                  {category}
                </span>
                <Status status={status} />
              </div>
              <div className="flex sm:hidden justify-between items-center mt-4">
                <CounterButton
                  postId={post_id}
                  userId={user.user_id}
                  upvoteId={upvote && upvote.upvote_id}
                  className="z-10"
                  direction="column"
                  upvoteCount={upvotes}
                />
                <CommentIcon comments={comments} />
              </div>
            </div>
            <div className={clsx("hidden sm:flex items-center")}>
              <CommentIcon comments={comments} />
            </div>
          </div>
        </article>
      </Link>
    </motion.li>
  );
}

function Status({ status }: { status: Post["status"] }) {
  const { bgWithOpacity, text } = ROADMAP_OPTIONS[status];
  return (
    <span
      className={clsx(
        "inline-block  text-xs font-bold px-4 py-2 rounded-xl",
        "md:text-sm",
        `${bgWithOpacity} ${text} `
      )}
    >
      {formatStatus(status)}
    </span>
  );
}

export default Post;
