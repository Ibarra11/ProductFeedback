"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { createComment } from "./helpers";
import LoadingCircle from "../components/LoadingCircle";
const COMMENT_LENGTH = 250;

function AddComment({ postFkId }: { postFkId: number }) {
  const [isPending, setIsPending] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const router = useRouter();
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsPending(true);
    try {
      const res = await createComment({
        content: comment,
        post_fk_id: postFkId,
      });
      if (res.ok) {
        setComment("");
        setIsPending(false);
        React.startTransition(() => {
          // refreshes the current route with losing client side state
          router.refresh();
        });
      }
    } catch (error) {}
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 pt-6 rounded-lg">
      <h3 className="text-lg font-bold mb-6">Add Comment</h3>
      <textarea
        className="h-20 w-full mb-4 resize-none overflow-y-auto bg-brand-alice_blue rounded-md"
        value={comment}
        onChange={(ev) => {
          if (ev.target.value.length <= COMMENT_LENGTH) {
            setComment(ev.target.value);
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
          {COMMENT_LENGTH - comment.length} characters left
        </span>
        <Button
          disabled={isPending || comment.length === 0}
          className={clsx(
            "relative bg-brand-purple text-brand-ghost_white transition-all duration-200",
            comment.length !== 0 && "hover:bg-purple-700",
            comment.length === 0 && "opacity-50"
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

export default AddComment;
