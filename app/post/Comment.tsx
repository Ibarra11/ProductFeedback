"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
// import { Comment } from "@prisma/client";
function Comment({
  comment_id,
  name,
  image,
  username,
  replyingTo,
  content,
}: {
  comment_id: number;
  username: string;
  name: string;
  image: string;
  replyingTo: string;
  content: string;
}) {
  const [isReplyOpen, setIsReplyOpen] = React.useState(false);
  const [reply, setReply] = React.useState("");
  // const marginLeft = Math.round(24 * level - Math.round(24 / level));
  return (
    <>
      <div
        // style={{ marginLeft }}
        className={clsx("flex items-start gap-8", {
          // "mb-8": !replyingTo,
        })}
      >
        <Image
          src={image}
          className="rounded-full"
          width={40}
          height={40}
          alt={`${username} profile picture`}
        />
        <div className=" flex-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-sm font-bold">{name}</h4>
              <p className="text-sm text-brand-blue_gray">@{username}</p>
            </div>
            <button
              className={clsx(
                `appearance-none text-brand-royal_blue font-semibold text-xs`,
                "hover:underline"
              )}
              onClick={() => setIsReplyOpen(!isReplyOpen)}
            >
              Reply
            </button>
          </div>
          <p className="text-base text-brand-blue_gray">
            {/* {replyingTo && (
              <span className=" text-brand-purple font-bold">
                @{replyingTo}
              </span>
            )}{" "} */}
            {/* <span className=" text-brand-purple font-bold">@{replyingTo}</span> */}
            {content}
          </p>
          {isReplyOpen && (
            <div className="flex items-start gap-4 mt-6">
              <TextArea
                className="flex-1"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button className=" bg-brand-purple text-brand-ghost_white">
                Post Reply
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* {replies && (
        <div className="flex flex-col gap-4">
          {replies.map((reply) => (
            <Comment key={reply.id} {...reply} level={level + 1} />
          ))}
        </div>
      )} */}
    </>
  );
}

export default Comment;
