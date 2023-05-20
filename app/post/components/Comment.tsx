"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import type { Comment } from "../../lib/prisma/Post";
import { useRouter } from "next/navigation";
import useMeasure from "react-use-measure";
import ReplyBox from "./ReplyBox";
import ViewMoreCommentsButton from "./ViewMoreCommentsButton";
import { useUserContext } from "@/app/components/UserProvider";
import { CommentSchema } from "@/app/lib/zod";
import LoadingCircle from "@/app/components/LoadingCircle";
import ReplyButton from "./ReplyButton";
import CommentModal from "./CommentModal/Modal";
import CommentIcon from "@/app/components/CommentIcon";
import { useCommentModalContext } from "./CommentModal/CommentModalProvider";

type Props = Comment & {
  level?: number;
  variant?: "modal";
};

const Comment = React.forwardRef<HTMLDivElement | null, Props>(
  ({ level = 1, ...comment }, ref) => {
    const {
      comment_id,
      post_fk_id,
      user_fk_id,
      User,
      replyingTo,
      replies,
      content,
      createdAt,
      variant,
    } = comment;

    const [isReplyOpen, setIsReplyOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const modalContext = useCommentModalContext();
    const [currentReplies, setCurrentReplies] = React.useState<Comment[]>([]);
    const [openViewMore, setOpenViewMore] = React.useState(false);
    const [viewMoreStatus, setViewMoreStatus] = React.useState<
      "pending" | "idle"
    >("idle");
    const currentUser = useUserContext();
    const router = useRouter();
    const startingImgRef = React.useRef<HTMLDivElement>(null);
    const lastChildRef = React.useRef<HTMLDivElement>(null);
    const [repliesContainerRef, repliesContainerBounds] = useMeasure();

    function handleSuccess(commentIds: Comment["replies"]) {
      setIsReplyOpen(false);
      viewMoreReplies(commentIds);
      React.startTransition(() => {
        router.refresh();
      });
    }

    async function viewMoreReplies(replyIds?: Comment["replies"]) {
      setViewMoreStatus("pending");
      let ids: string[];
      if (replyIds) {
        ids = replyIds.map((reply) => `ids=${reply.comment_id}`);
      } else {
        ids = replies.map((reply) => {
          return `ids=${reply.comment_id}`;
        });
      }
      const res = await fetch(`/api/comment?${ids.join("&")}`);
      const rawData = await res.json();
      try {
        const { comments } = CommentSchema.replies.parse(rawData);
        setCurrentReplies(comments);
        setOpenViewMore(true);
        React.startTransition(() => {
          router.refresh();
        });
      } catch (e) {
        console.error(e);
      } finally {
        setViewMoreStatus("idle");
      }
    }

    const marginLeft = Math.round(36 * (level - 1));
    const { image, username, name } = User;
    return (
      <>
        <div
          style={{ marginLeft }}
          className={clsx("relative flex gap-8 min-h-[150px]")}
        >
          <div
            ref={ref ? startingImgRef : null}
            className="relative self-stretch sm:self-start"
          >
            <div
              className="flex flex-col justify-between items-center h-full  sm:block sm:h-auto"
              ref={ref ? ref : startingImgRef}
            >
              <Image
                src={image}
                className="rounded-full block "
                width={40}
                height={40}
                alt={`${username} profile picture`}
              />

              {variant && modalContext && (
                <div className="flex-1 flex flex-col items-center justify-end gap-2 ">
                  {modalContext.comment.comment_id !== comment_id ? (
                    <ViewMoreCommentsButton
                      size={18}
                      disabled={false}
                      onClick={() => {
                        modalContext.handleCommentChange(comment);
                      }}
                      isOpen={false}
                    />
                  ) : (
                    <CommentIcon comments={replies.length} />
                  )}
                </div>
              )}
              {!variant && currentUser.user_id !== user_fk_id && (
                <div className="sm:hidden">
                  <ViewMoreCommentsButton
                    size={20}
                    disabled={viewMoreStatus === "pending"}
                    onClick={() =>
                      // @ts-ignore
                      setIsModalOpen(true)
                    }
                    isOpen={openViewMore}
                  />
                </div>
              )}
            </div>
            {level > 1 && (
              <div
                style={{
                  top: "50%",
                  width: Math.floor(36 / 2 - 2),

                  translate: `-${36 / 2 - 2}px -50%`,
                }}
                className={`inline-block outline-1 outline-dashed outline-slate-400  absolute`}
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

          <div className="flex-1">
            <div className="sm:flex sm:justify-between sm:items-center mb-4">
              <div>
                <div className="flex items-baseline justify-between sm:justify-start">
                  <h4 className="text-sm font-bold">{name}</h4>
                  <span className="ml-2 text-slate-400 text-xs">
                    {createdAt}
                  </span>
                </div>
                <p className="text-sm text-brand-blue_gray">@{username}</p>
              </div>
              <div className="hidden sm:flex sm:gap-4">
                {replies.length > 0 && (
                  <ViewMoreCommentsButton
                    size={18}
                    disabled={viewMoreStatus === "pending"}
                    onClick={() =>
                      openViewMore ? setOpenViewMore(false) : viewMoreReplies()
                    }
                    isOpen={openViewMore}
                  />
                )}

                <ReplyButton
                  isOpen={openViewMore}
                  onClick={() => {
                    setIsReplyOpen(!isReplyOpen);
                  }}
                />
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
              <div className="absolute h-6 w-6 -bottom-8 left-1/2 -translate-x-1/2">
                <LoadingCircle color="secondary" size="sm" />
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <CommentModal
            userId={currentUser.user_id}
            comment={comment}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
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
