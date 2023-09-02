"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import LoadingCircle from "@/components/LoadingCircle";
import Button from "@/components/Button";
import { ZCommentSchema } from "@/lib/zod";
import { User } from "@/types";
import { createCommentAction } from "../actions";
const COMMENT_LENGTH = 250;

interface Props {
  postId: number;
  user: User | undefined;
}

function AddComment({ postId, user }: Props) {
  const [isPending, setIsPending] = React.useState(false);
  const [content, setContent] = React.useState("");

  const router = useRouter();
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsPending(true);
    try {
      const result = await createCommentAction({ postId, content });
      if (result.success) {
        router.refresh();
      }
    } catch (e) {
    } finally {
      setIsPending(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 pt-6 rounded-lg">
      <h3 className="text-lg font-bold mb-6">Add Comment</h3>
      <textarea
        className="h-20 w-full mb-4 resize-none overflow-y-auto bg-brand-alice_blue rounded-md"
        value={content}
        onChange={(ev) => {
          if (
            ev.target.value.charCodeAt(0) === 10 &&
            ev.target.value.trim().length === 0
          ) {
            return;
          }

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

export default AddComment;
