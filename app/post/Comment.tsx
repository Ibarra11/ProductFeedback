"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import type { T_Comment } from "../lib/prisma/post";
import { useUserContext } from "../components/UserProvider";
import { useRouter } from "next/navigation";
import LoadingCircle from "../components/LoadingCircle";
import { Comment } from "@prisma/client";
import useMeasure from "react-use-measure";

type Props = T_Comment & {
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
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isReplyOpen, setIsReplyOpen] = React.useState(false);
    const [reply, setReply] = React.useState("");
    const [currentReplies, setCurrentReplies] =
      React.useState<Comment[]>(replies);
    const [openViewMore, setOpenViewMore] = React.useState(false);
    const currentUser = useUserContext();
    const router = useRouter();
    const startingImgRef: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef<HTMLDivElement>(null);
    const path: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef<HTMLDivElement>(null);
    const lastChildRef: React.MutableRefObject<HTMLDivElement | null> =
      React.useRef<HTMLDivElement>(null);
    const [repliesContainerRef, repliesContainerBounds] = useMeasure();

    function closeReplies() {
      setOpenViewMore(false);
    }

    async function viewMoreReplies(commentId?: number) {
      let ids = currentReplies.map((reply) => {
        return `ids=${reply.comment_id}`;
      });
      if (commentId) {
        ids.push(`ids=${commentId}`);
      }

      const res = await fetch(`/api/comment?${ids.join("&")}`);
      const data = await res.json();

      setCurrentReplies(data.comments);
      setOpenViewMore(true);

      React.startTransition(() => {
        router.refresh();
      });
    }

    const marginLeft = Math.round(36 * (level - 1));
    const { image, username, name } = User;

    async function addReply() {
      setIsLoading(true);
      const res = await fetch("/api/comment", {
        method: "PUT",
        body: JSON.stringify({
          content: reply,
          userId: currentUser.user_id,
          postId: post_fk_id,
          commentId: comment_id,
          replyingTo: username,
        }),
      });

      const comments = await res.json();

      if (res.ok) {
        setIsLoading(false);
        setIsReplyOpen(false);
        setReply("");
        viewMoreReplies(comments[0].comment_id);
        React.startTransition(() => {
          router.refresh();
        });
      }
    }

    return (
      <>
        <div style={{ marginLeft }} className={clsx("flex items-start gap-8 ")}>
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
                <h4 className="text-sm font-bold">{name}</h4>
                <p className="text-sm text-brand-blue_gray">@{username}</p>
              </div>
              <div className="flex gap-2">
                {user_fk_id !== currentUser.user_id && (
                  <button
                    className={clsx(
                      `appearance-none text-brand-royal_blue font-semibold text-xs`,
                      "hover:underline"
                    )}
                    onClick={() => {
                      setIsReplyOpen(!isReplyOpen);
                    }}
                  >
                    Reply
                  </button>
                )}
                {currentReplies.length > 0 && (
                  <button
                    className={clsx(
                      `appearance-none text-brand-royal_blue font-semibold text-xs`,
                      "hover:underline"
                    )}
                    onClick={() =>
                      openViewMore ? closeReplies() : viewMoreReplies()
                    }
                  >
                    {openViewMore ? "Close" : "View"}
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
              <div className="flex items-start gap-4 mt-6">
                <TextArea
                  className="flex-1"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button
                  onClick={addReply}
                  className=" bg-brand-purple text-brand-ghost_white"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingCircle /> : "Post Reply"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {openViewMore && (
          <div ref={repliesContainerRef} className="flex flex-col gap-8 mt-4 ">
            {currentReplies.map((reply, index) => {
              console.log(reply);
              return (
                <Comment
                  key={reply.comment_id}
                  level={level + 1}
                  Post={Post}
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
