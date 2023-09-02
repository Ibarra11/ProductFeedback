"use client";
import React from "react";
import clsx from "clsx";
import { Comment } from "../../../lib/prisma/Post";
import { CommentSchema } from "@/lib/zod";
import { useUserContext } from "@/components/UserProvider";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import LoadingCircle from "@/components/LoadingCircle";
import { replyCommentAction } from "../actions";

interface Props {
  postId: number;
  commentId: number;
  replyingTo: string;
  onSuccess: (commentId: Comment["replies"]) => void;
}
function ReplyBox({ onSuccess, postId, commentId, replyingTo }: Props) {
  const [isPending, setIsPending] = React.useState(false);
  const [content, setContent] = React.useState("");

  async function createReply() {
    setIsPending(true);
    try {
      const result = await replyCommentAction({
        content,
        commentId,
        postId,
        replyingTo,
      });
      if (result.success) {
        const { replies } = CommentSchema.replies.parse(result.data);
        onSuccess(replies);
      }
    } catch (e) {
    } finally {
      setIsPending(false);
      setContent("");
    }
  }

  return (
    <div className="flex items-start gap-4 mt-6">
      <TextArea
        className="flex-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={createReply}
        className={clsx(
          "relative bg-brand-purple text-brand-ghost_white",
          content.length === 0 && " opacity-50"
        )}
        disabled={isPending || content.length === 0}
      >
        <span className={` ${isPending ? "invisible" : ""} `}>Post Reply</span>
        {isPending && <LoadingCircle size="md" color="primary" />}
      </Button>
    </div>
  );
}

export default ReplyBox;
