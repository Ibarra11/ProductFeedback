"use client";
import { use } from "react";
import RoadmapRequest from "./RoadmapPost";
import clsx from "clsx";
import { usePostsContext } from "@/app/components/PostsProvider";
import { formatStatus } from "@/app/utils";
import { ROADMAP_TAB_DESCRIPTION } from "@/app/constants";
import EmptySuggestionsView from "@/app/components/EmptySuggestionsView";
import { Category, Status, Upvotes, User } from "@prisma/client";
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
    <div className="flex flex-1 flex-col h-full">
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
      <div className={clsx("flex-1")}>
        {currentPosts.length > 0 && (
          <div
            className={clsx(
              "h-full content-start  grid grid-cols-1 gap-4",
              "md:gap-6 md:grid-cols-2",
              "lg:grid-cols-3"
            )}
          >
            {currentPosts.map((feedback) => {
              return (
                <RoadmapRequest
                  user={user}
                  key={feedback.post_id}
                  {...feedback}
                />
              );
            })}
          </div>
        )}

        {currentPosts.length === 0 && (
          <div className="h-full">
            {" "}
            <EmptySuggestionsView />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapPostList;
