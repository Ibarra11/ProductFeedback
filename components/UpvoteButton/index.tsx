"use client";
import React from "react";
import { ChevronUp } from "react-feather";
import clsx from "clsx";
import LoadingCircle from "../LoadingCircle";
import { useRouter } from "next/navigation";
import { ButtonProps } from "@/types";

type Props = {
  upvoteCount: number;
  postId: number;
  userId: string;
  upvoteId?: number;
  direction: "row" | "column";
};

function UpvoteButton({
  upvoteCount,
  userId,
  postId,
  upvoteId,
  className,
  direction,
  ...rest
}: ButtonProps<Props>) {
  const router = useRouter();
  const [isFetching, setIsFetching] = React.useState(false);
  async function handleCreateUpvote() {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/post/${postId}/upvote`, {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      });
      if (res.ok) {
        React.startTransition(() => {
          router.refresh();
        });
      }
    } finally {
      setIsFetching(false);
    }
  }

  async function handleDeleteUpvote() {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/post/${postId}/downvote`, {
        method: "DELETE",
      });
      if (res.ok) {
        React.startTransition(() => {
          router.refresh();
        });
      }
    } finally {
      setIsFetching(false);
    }
  }
  const flexDirection =
    direction === "column"
      ? "flex-col gap-1 items-center justify-center w-10 h-14"
      : "flex- gap-2 h-10 w-16  px-3 items-center";
  return (
    <button
      className={clsx(
        "counter-btn relative flex  rounded-lg bg-brand-alice_blue",
        className,
        flexDirection,
        upvoteId
          ? "bg-brand-royal_blue text-brand-ghost_white"
          : "text-brand-american_blue",
        !upvoteId && " hover:bg-blue-100",
        " outline-none focus:outline focus:outline-2 focus:outline-brand-royal_blue",
        "transition-colors duration-200"
      )}
      {...rest}
      onClick={(e) => {
        // this button is used within a link, it will fire the the anchor link aswell.  Prevent defualt prevents the link from firing
        e.preventDefault();
        if (upvoteId) {
          handleDeleteUpvote();
        } else {
          handleCreateUpvote();
        }
      }}
      disabled={isFetching}
    >
      {isFetching === false && (
        <>
          <span
            className={clsx(
              "flex w-full justify-center ",
              upvoteId && "text-white"
            )}
          >
            <ChevronUp size={16} />
          </span>
          <span
            className={clsx(
              "flex w-full  justify-center text-sm font-bold",
              upvoteId && "text-white"
            )}
          >
            {upvoteCount}
          </span>
        </>
      )}
      {isFetching && (
        <LoadingCircle size="md" color={upvoteId ? "primary" : "secondary"} />
      )}
    </button>
  );
}

export default UpvoteButton;
