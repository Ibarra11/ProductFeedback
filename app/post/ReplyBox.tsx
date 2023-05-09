"use client";
import React from "react";
import clsx from "clsx";
import Button from "../components/Button";
import LoadingCircle from "../components/LoadingCircle";
import TextArea from "../components/TextArea";
import { Comment } from "../lib/prisma/post";
interface Props {
  userId: number;
  postId: number;
  commentId: number;
  replyingTo: string;
  onSuccess: (commentId: Comment["replies"]) => void;
}
function ReplyBox({ onSuccess, userId, postId, commentId, replyingTo }: Props) {
  const [isPending, setIsPending] = React.useState(false);
  const [reply, setReply] = React.useState("");

  async function addReply() {
    setIsPending(true);
    const res = await fetch("/api/comment", {
      method: "PUT",
      body: JSON.stringify({
        content: reply,
        userId,
        postId,
        commentId,
        replyingTo,
      }),
    });
    const comments = await res.json();
    if (res.ok) {
      setIsPending(false);
      setReply("");
      onSuccess(comments);
    }
  }

  return (
    <div className="flex items-start gap-4 mt-6">
      <TextArea
        className="flex-1"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <Button
        onClick={addReply}
        className={clsx(
          "bg-brand-purple text-brand-ghost_white",
          reply.length === 0 && " opacity-50"
        )}
        disabled={isPending || reply.length === 0}
      >
        {isPending ? <LoadingCircle /> : "Post Reply"}
      </Button>
    </div>
  );
}

export default ReplyBox;
