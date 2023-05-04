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
      {/* */}
      <Link href={`/post/${post_id}`}>
        <article
          className={clsx(
            !disableAnimation && "group",
            "bg-white   py-7 px-8   rounded-xl"
          )}
        >
          <div className="mb-2 text-right">
            <p className="text-sm text-slate-400">{createdAt}</p>
          </div>
          <div className="flex  gap-6 md:gap-10">
            <div className="flex flex-col justify-between  md:block">
              <CounterButton
                postId={post_id}
                userId={user.user_id}
                upvoteId={upvote && upvote.upvote_id}
                className="z-10"
                direction="column"
                upvoteCount={upvotes}
              />
              <div className={clsx(" sm:hidden", "md:hidden")}>
                <CommentIcon comments={comments} />
              </div>
            </div>
            <div className="flex-1">
              <div className=" space-y-2 mb-6">
                <h3
                  className={clsx(
                    `group-hover:text-brand-purple group-focus:text-brand-purple`,
                    "text-brand-gray_blue text-lg font-bold"
                  )}
                >
                  {title}
                </h3>
                <p className=" text-base text-slate-500">{content}</p>
              </div>

              <div className="flex justify-between items-center ">
                <div className="flex gap-2">
                  <span className="inline-block bg-brand-alice_blue  text-brand-royal_blue text-sm font-semibold px-4 py-2 rounded-xl">
                    {category}
                  </span>
                  <Status status={status} />
                </div>

                <div className={clsx("hidden sm:block", "md:hidden")}>
                  <CommentIcon comments={comments} />
                </div>
              </div>
            </div>
            <div className={clsx("hidden", "md:flex items-center")}>
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
        "inline-block  text-sm font-bold px-4 py-2 rounded-xl",
        `${bgWithOpacity} ${text} `
      )}
    >
      {formatStatus(status)}
    </span>
  );
}

export default Post;
