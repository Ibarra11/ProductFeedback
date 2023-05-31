"use client";
import Link from "next/link";
import CounterButton from "../CounterButton";
import CommentIcon from "../CommentIcon";
import clsx from "clsx";
import type { Post } from "@/app/lib/prisma/Post";
import { useUserContext } from "../UserProvider";
import { formatStatus } from "@/app/utils";
import { ROADMAP_OPTIONS } from "@/app/constants";

function Post({
  post_id,
  title,
  content,
  category,
  status,
  createdAt,
  disableHighlightAnimation = false,
  _count: { comments, upvotes },
}: Post & { disableHighlightAnimation?: boolean }) {
  const user = useUserContext();
  const upvote = user.Upvotes.find((upvote) => upvote.post_fk_id === post_id);
  return (
    // @ts-ignore
    <Link href={`/post/${post_id}`}>
      <article
        className={clsx(
          !disableHighlightAnimation && "group",
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
          <div className="flex-1">
            <div className="space-y-2 md:space-y-1 mb-2 md:mb-3">
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
            <div className="flex gap-2 flex-col items-start sm:flex-row mb-6 md:mb-0">
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
            <div className="flex sm:hidden justify-between items-center">
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
