"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { createComment } from "./helpers";
const COMMENT_LENGTH = 250;
function AddComment({ postFkId }: { postFkId: number }) {
  const [status, setStatus] = React.useState<"idle" | "pending">("idle");
  const [content, setComment] = React.useState("");
  const router = useRouter();
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setStatus("pending");
    try {
      const res = await createComment({ content, post_fk_id: postFkId });
      if (res.ok) {
        setComment("");
        React.startTransition(() => {
          // refreshes the current route with losing client side state
          router.refresh();
        });
      }
    } catch (error) {
    } finally {
      setStatus("pending");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 pt-6 rounded-lg">
      <h3 className="text-lg font-bold mb-6">Add Comment</h3>
      <textarea
        className="h-20 w-full mb-4 resize-none overflow-y-auto bg-brand-alice_blue rounded-md"
        value={content}
        onChange={(ev) => {
          if (ev.target.value.length <= COMMENT_LENGTH) {
            setComment(ev.target.value);
          }
        }}
      ></textarea>
      <div className="flex justify-between items-center">
        <span className="text-sm text-brand-american_blue">
          {COMMENT_LENGTH - content.length} characters lefT
        </span>
        <Button className="bg-brand-purple text-brand-ghost_white">
          Post Comment
        </Button>
      </div>
    </form>
  );
}

export default AddComment;
