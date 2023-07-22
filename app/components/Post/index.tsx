"use client";
import Link from "next/link";
import Image from "next/image";
import CounterButton from "../CounterButton";
import CommentIcon from "../CommentIcon";
import clsx from "clsx";
import type { Post } from "@/app/lib/prisma/Post";
import { useUserContext } from "../UserProvider";
import { formatStatus } from "@/app/utils";
import { ROADMAP_OPTIONS } from "@/app/constants";

function Post({
  id,
  title,
  content,
  category,
  status,
  createdAt,
  disableHighlightAnimation = false,
  _count,
  upvotes,
}: Post & { disableHighlightAnimation?: boolean }) {
  const user = useUserContext();

  const upvote = upvotes.find((upvote) => upvote.User.id === user.id);
  return (
    // @ts-ignore
    <Link href={`/post/${id}`}>
      <article
        className={clsx(
          !disableHighlightAnimation && "group",
          "rounded-xl bg-white p-6 md:py-7 md:px-8"
        )}
      >
        <div className="mb-4 flex justify-between">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              src={user.image || ""}
              width={24}
              height={24}
              alt={`${user.name} avatar`}
            />
            <h4 className="text-sm text-slate-400">{user.name}</h4>
          </div>

          <p className="text-sm text-slate-400">{createdAt}</p>
        </div>
        <div className="flex sm:gap-10  md:gap-6">
          <div className="hidden sm:block">
            <CounterButton
              postId={id}
              userId={user.id}
              upvoteId={upvote?.id}
              className="z-10"
              direction="column"
              upvoteCount={_count.upvotes}
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 space-y-2 md:mb-3 md:space-y-1">
              <h3
                className={clsx(
                  `group-hover:text-brand-purple group-focus:text-brand-purple`,
                  " text-brand-gray_blue text-sm font-bold",
                  " md:text-lg"
                )}
              >
                {title}
              </h3>
              <p className={clsx("text-sm text-slate-500", "md:text-base ")}>
                {content}
              </p>
            </div>
            <div className="mb-6 flex  flex-wrap gap-2   md:mb-0">
              <span
                className={clsx(
                  "inline-block rounded-xl  bg-brand-alice_blue px-4 py-2 text-xs font-semibold text-brand-royal_blue",
                  "md:text-sm"
                )}
              >
                {category}
              </span>
              <Status status={status} />
            </div>
            <div className="isolate flex items-center justify-between  sm:hidden">
              <CounterButton
                postId={id}
                userId={user.id}
                upvoteId={upvote?.id}
                className="z-10"
                direction="column"
                upvoteCount={_count.upvotes}
              />
              <CommentIcon comments={_count.comments} />
            </div>
          </div>
          <div className={clsx("hidden items-center sm:flex")}>
            <CommentIcon comments={_count.comments} />
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
        "inline-block  rounded-xl px-4 py-2 text-xs font-bold",
        "md:text-sm",
        `${bgWithOpacity} ${text} `
      )}
    >
      {formatStatus(status)}
    </span>
  );
}

export default Post;
