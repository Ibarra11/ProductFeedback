"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { BiCommentAdd, BiCommentDetail } from "react-icons/bi";
import type { Comment } from "../lib/prisma/post";
import { useUserContext } from "../components/UserProvider";
import { useRouter } from "next/navigation";
import useMeasure from "react-use-measure";
import { convertDateToString } from "../utils";
import ReplyBox from "./ReplyBox";
import LoadingCircle from "../components/LoadingCircle";

type Props = Comment & {
  level?: number;
};

const Comment = React.forwardRef<HTMLDivElement | null, Props>(
  (
    {
      comment_id,
      post_fk_id,
      user_fk_id,
      User,
      Post,
      replyingTo,
      replies,
      content,
      level = 1,
      createdAt,
    },
    ref
  ) => {
    const [isReplyOpen, setIsReplyOpen] = React.useState(false);
    const [currentReplies, setCurrentReplies] =
      React.useState<Comment[]>(replies);
    const [openViewMore, setOpenViewMore] = React.useState(false);
    const [viewMoreStatus, setViewMoreStatus] = React.useState<
      "pending" | "idle"
    >("idle");
    const currentUser = useUserContext();
    const router = useRouter();
    const startingImgRef: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef<HTMLDivElement>(null);
    const lastChildRef: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef<HTMLDivElement>(null);
    const [repliesContainerRef, repliesContainerBounds] = useMeasure();

    function handleSuccess(commentId: number) {
      setIsReplyOpen(false);
      viewMoreReplies(commentId);
      React.startTransition(() => {
        router.refresh();
      });
    }

    async function viewMoreReplies(commentId?: number) {
      setViewMoreStatus("pending");
      let ids = currentReplies.map((reply) => {
        return `ids=${reply.comment_id}`;
      });
      if (commentId) {
        ids.push(`ids=${commentId}`);
      }

      const res = await fetch(`/api/comment?${ids.join("&")}`);
      const data = await res.json();
      const comments = data.comments.map((comment) => {
        return {
          ...comment,
          createdAt: convertDateToString(new Date(comment.createdAt)),
        };
      });
      setCurrentReplies(comments);
      setOpenViewMore(true);
      setViewMoreStatus("idle");

      React.startTransition(() => {
        router.refresh();
      });
    }

    const marginLeft = Math.round(36 * (level - 1));
    const { image, username, name } = User;

    return (
      <>
        <div
          style={{ marginLeft }}
          className={clsx("relative  flex items-start gap-8")}
        >
          <div ref={ref ? startingImgRef : null} className="relative">
            {
              <div ref={ref ? ref : startingImgRef}>
                <Image
                  src={image}
                  className="rounded-full "
                  width={40}
                  height={40}
                  alt={`${username} profile picture`}
                />
              </div>
            }

            {level > 1 && (
              <div
                style={{
                  top: "50%",
                  width: Math.floor(36 / 2 - 2),

                  translate: `-${36 / 2 - 2}px -50%`,
                }}
                className={`inline-block outline-1 outline-dashed outline-slate-400  absolute `}
              ></div>
            )}
            {lastChildRef.current && startingImgRef.current && (
              <div
                ref={(node) => {
                  if (node && lastChildRef.current && startingImgRef.current) {
                    node.style.height = `${Math.floor(
                      lastChildRef.current.getBoundingClientRect().y -
                        startingImgRef.current.getBoundingClientRect().y -
                        20
                    ).toFixed(0)}px`;
                  }
                }}
                className="inline-block outline-1 outline-dashed outline-slate-400 absolute top-full left-1/2 -translate-x-1/2 "
              ></div>
            )}
          </div>

          <div className=" flex-1">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-baseline">
                  <h4 className="text-sm font-bold">{name}</h4>
                  <span className="ml-2 text-slate-400 text-xs">
                    {createdAt}
                  </span>
                </div>

                <p className="text-sm text-brand-blue_gray">@{username}</p>
              </div>
              <div className="flex gap-4">
                {currentReplies.length > 0 && (
                  <button
                    className={clsx(
                      `appearance-none text-brand-royal_blue font-semibold text-lg`,
                      "hover:underline",
                      openViewMore
                        ? " text-brand-royal_blue"
                        : " text-slate-500"
                    )}
                    onClick={() =>
                      openViewMore ? setOpenViewMore(false) : viewMoreReplies()
                    }
                  >
                    <BiCommentDetail />
                  </button>
                )}
                {user_fk_id !== currentUser.user_id && (
                  <button
                    className={clsx(
                      `appearance-none  font-semibold text-lg `,
                      "hover:underline",
                      isReplyOpen ? " text-brand-royal_blue" : " text-slate-500"
                    )}
                    onClick={() => {
                      setIsReplyOpen(!isReplyOpen);
                    }}
                  >
                    <BiCommentAdd />
                  </button>
                )}
              </div>
            </div>
            <p className="text-base text-brand-blue_gray">
              {replyingTo && (
                <span className=" text-brand-purple font-bold">
                  @{replyingTo}
                </span>
              )}{" "}
              {content}
            </p>
            {isReplyOpen && (
              <ReplyBox
                replyingTo={username}
                commentId={comment_id}
                userId={currentUser.user_id}
                postId={post_fk_id}
                onSuccess={handleSuccess}
              />
            )}
            {viewMoreStatus === "pending" && (
              <LoadingCircle
                containerStyles="absolute  -translate-x-1/2 translate-y-full left-1/2 bottom-0"
                svgStyles="w-8 h-8 text-brand-american_blue"
              />
            )}
          </div>
        </div>

        {openViewMore && (
          <div ref={repliesContainerRef} className="flex flex-col gap-8 mt-4">
            {currentReplies.map((reply, index) => {
              return (
                <Comment
                  key={reply.comment_id}
                  level={level + 1}
                  {...reply}
                  ref={
                    currentReplies.length - 1 === index
                      ? lastChildRef
                      : undefined
                  }
                />
              );
            })}
          </div>
        )}
      </>
    );
  }
);

Comment.displayName = "Comment";

export default Comment;
