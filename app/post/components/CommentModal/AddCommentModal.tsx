"use client";
import React from "react";
import clsx from "clsx";
import LoadingCircle from "@/app/components/LoadingCircle";
import { IoMdClose } from "react-icons/io";
import Button from "@/app/components/Button";
import AddCommentButton from "./AddCommentButton";
import { addReply } from "@/app/lib/mutations";
import { Comment } from "@/app/lib/prisma";
import { Session } from "next-auth";
const COMMENT_LENGTH = 250;

interface Props {
  userId: Session["user"]["id"];
  comment: Comment;
  updateComment: (newReplies: Comment["replies"]) => void;
  closeComment: () => void;
}

function AddCommentModal({
  userId,
  comment,
  updateComment,
  closeComment,
}: Props) {
  const [isPending, setIsPending] = React.useState(false);
  const [content, setContent] = React.useState("");
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsPending(true);
    try {
      const { replies } = await addReply({
        content,
        userId,
        postId: comment.post_id,
        commentId: comment.comment_id,
        replyingTo: comment.User.name!,
      });
      setIsPending(false);
      setContent("");
      updateComment(replies);
      closeComment();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 pt-6">
      <div className=" flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Add Comment</h3>
        <AddCommentButton disabled={isPending} onClick={() => closeComment()}>
          <IoMdClose className=" text-brand-ghost_white" size={20} />
          <span className="sr-only">Close comment</span>
        </AddCommentButton>
      </div>
      <textarea
        className="h-20 w-full mb-4 resize-none overflow-y-auto bg-brand-alice_blue"
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
