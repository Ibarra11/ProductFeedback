"use client";
import React from "react";
import { ChevronUp } from "react-feather";
import clsx from "clsx";
import LoadingCircle from "../LoadingCircle";
import { ButtonBase } from "@/types";
import { useRouter } from "next/navigation";

type ButtonProps = ButtonBase<{
  upvoteCount: number;
  postId: number;
  userId: number;
  upvoteId?: number;
  direction: "row" | "column";
}>;

function CounterButton({
  upvoteCount,
  userId,
  postId,
  upvoteId,
  className,
  direction,
  ...rest
}: ButtonProps) {
  const router = useRouter();
  const [isFetching, setIsFetching] = React.useState(false);
  async function handleCreateUpvote() {
    setIsFetching(true);
    const res = await fetch(`/api/post/${postId}/upvote`, {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
    });
    if (res.ok) {
      setIsFetching(false);
      React.startTransition(() => {
        router.refresh();
      });
    }
  }

  async function handleDeleteUpvote() {
    setIsFetching(true);
    const res = await fetch(`/api/post/${postId}/downvote`, {
      method: "DELETE",
      body: JSON.stringify({
        upvoteId,
      }),
    });
    if (res.ok) {
      setIsFetching(false);
      React.startTransition(() => {
        router.refresh();
      });
    }
  }
  const flexDirection =
    direction === "column"
      ? "flex-col gap-1 items-center justify-center w-10 h-14"
      : "flex- gap-2 h-10 w-[69px] px-3 items-center";
  return (
    <button
      className={clsx(
        "counter-btn bg-brand-alice_blue flex rounded-lg",
        className,
        flexDirection,
        upvoteId && "bg-brand-royal_blue",
        !upvoteId && "hover:border-2 hover:border-brand-royal_blue",
        "duration-200 transition-colors"
      )}
      {...rest}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (upvoteId) {
          handleDeleteUpvote();
        } else {
          handleCreateUpvote();
        }
      }}
    >
      {isFetching === false && (
        <>
          <span
            className={clsx(
              "flex w-full justify-center text-brand-american_blue",
              upvoteId && "text-white"
            )}
          >
            <ChevronUp size={16} />
          </span>
          <span
            className={clsx(
              "text-sm font-bold text-brand-american_blue flex w-full justify-center",
              upvoteId && "text-white"
            )}
          >
            {upvoteCount}
          </span>
        </>
      )}
      {isFetching && <LoadingCircle />}
    </button>
  );
}

export default CounterButton;
