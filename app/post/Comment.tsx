"use client";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import TextArea from "../components/TextArea";
import { CommentType } from "@/types";
import Button from "../components/Button";
function Comment({
  id,
  content,
  user: { image, name, username },
}: CommentType) {
  const [isReplyOpen, setIsReplyOpen] = React.useState(false);
  const [reply, setReply] = React.useState("");
  return (
    <div className="flex items-start gap-8 ">
      <Image
        src={image}
        className="rounded-full"
        width={40}
        height={40}
        alt={`${name} profile picture`}
      />
      <div>
        <div className="flex justify-between items-center">
          <div className="mb-4">
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
        <p className="text-base text-brand-blue_gray">{content}</p>
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
  );
}

export default Comment;
