"use client";
import RoadmapRequest from "./RoadmapPost";
import clsx from "clsx";
import { ROADMAP_TAB_DESCRIPTION } from "../constants";
import { Category, Status, Upvotes, User } from "@prisma/client";
import { use } from "react";
import { usePostsContext } from "../components/PostsProvider";
import { formatStatus } from "../utils";

interface Props {
  postsPromise: Promise<
    {
      createdAt: string;
      post_id: number;
      title: string;
      content: string;
      category: Category;
      status: Status;
      user_fk_id: number;
      _count: {
        upvotes: number;
        comments: number;
      };
    }[]
  >;
  user: User & {
    Upvotes: Upvotes[];
  };
  status: Status;
}

function RoadmapPostList({ postsPromise, user, status }: Props) {
  const posts = use(postsPromise);
  const { getFilteredPosts } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  return (
    <div className="flex-1">
      <div
        className={clsx("text-brand-american_blue mb-2", " md:mb-6", "lg:mb-4")}
      >
        <h2 className={clsx(" text-sm font-bold mb-2", "lg:text-lg lg:mb-1")}>
          {formatStatus(status)} ({currentPosts.length})
        </h2>
        <p
          className={clsx(
            "text-sm text-brand-gray-blue opacity-75",
            "lg:text-base"
          )}
        >
          {ROADMAP_TAB_DESCRIPTION[status]}
        </p>
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 gap-4",
          "md:gap-6 md:grid-cols-2",
          "lg:grid-cols-3"
        )}
      >
        {currentPosts.map((feedback) => {
          return (
            <RoadmapRequest user={user} key={feedback.post_id} {...feedback} />
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapPostList;
