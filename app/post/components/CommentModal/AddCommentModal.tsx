"use client";
import React from "react";
import clsx from "clsx";
import LoadingCircle from "@/app/components/LoadingCircle";
import Button from "@/app/components/Button";
import { addReply } from "@/app/lib/mutations";
import { Comment } from "@/app/lib/prisma";
const COMMENT_LENGTH = 250;

function AddCommentModal({
  userId,
  comment,
  updateComment,
}: {
  userId: number;
  comment: Comment;
  updateComment: (newReplies: Comment["replies"]) => void;
}) {
  const [isPending, setIsPending] = React.useState(false);
  const [content, setContent] = React.useState("");
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsPending(true);
    try {
      const { replies } = await addReply({
        content,
        userId,
        postId: comment.post_fk_id,
        commentId: comment.comment_id,
        replyingTo: comment.User.username,
      });
      setIsPending(false);
      setContent("");
      updateComment(replies);
    } catch (error) {
      console.log(error);
    }
  }

  // async function addReply(content: string) {
  //   //  const res = await fetch("/api/comment", {
  //   //    method: "PUT",
  //   //    body: JSON.stringify({
  //   //      content: content,
  //   //      userId: userId,
  //   //      postId: comments[commentIndex].post_fk_id,
  //   //      commentId: comments[commentIndex].comment_id,
  //   //      replyingTo: comments[commentIndex].User.username,
  //   //    }),
  //   //  });
  //   //  if (res.ok) {
  //   //    const data = await res.json();
  //   //    const updatedComment = { ...comments[commentIndex] };
  //   //    updatedComment.replies = data.replies;
  //   //    setComments([...comments.slice(0, commentIndex), updatedComment]);
  //   //    return true;
  //   //  }
  //   //  return false;
  // }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 pt-6 rounded-lg">
      <h3 className="text-lg font-bold mb-6">Add Comment</h3>
      <textarea
        className="h-20 w-full mb-4 resize-none overflow-y-auto bg-brand-alice_blue rounded-md"
        value={content}
        onChange={(ev) => {
          if (ev.target.value.length <= COMMENT_LENGTH) {
            setContent(ev.target.value);
          }
        }}
      ></textarea>
      <div
        className={clsx(
          "flex flex-col gap-3",
          "sm:flex-row sm:items-center sm:justify-between"
        )}
      >
        <span className="text-sm order-2 self-end text-brand-american_blue sm:order-1 sm:self-auto">
          {COMMENT_LENGTH - content.length} characters left
        </span>
        <Button
          disabled={isPending || content.length === 0}
          className={clsx(
            "relative bg-brand-purple text-brand-ghost_white transition-all duration-200",
            content.length !== 0 && "hover:bg-purple-700",
            content.length === 0 && "opacity-50"
          )}
        >
          <span className={` ${isPending ? "invisible" : ""} `}>
            Post Comment
          </span>
          {isPending && <LoadingCircle size="md" color="primary" />}
        </Button>
      </div>
    </form>
  );
}

export default AddCommentModal;
