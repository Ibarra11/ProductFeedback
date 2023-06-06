"use client";
import { ROADMAP_OPTIONS } from "@/app/constants";
import { filterPostsByStatus, formatStatus } from "@/app/utils";
import { usePostsContext } from "../PostsProvider";
import { use } from "react";
import { Category, Status } from "@prisma/client";
import { PostsPromise } from "@/types";

function RoadmapList({ postsPromise }: { postsPromise: PostsPromise }) {
  const posts = use(postsPromise);
  const { getFilteredPosts } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  const { Planned, In_Progress, Live, Suggestion } =
    filterPostsByStatus(currentPosts);
  return (
    <ul className="flex flex-col gap-2 text-brand-blue_gray">
      {[Planned, In_Progress, Live, Suggestion].map(({ status, count }) => (
        <li
          key={`${status}`}
          aria-label={status}
          className="flex gap-4 justify-between"
        >
          <div className="flex items-center gap-4">
            <span
              className={`inline-block w-2 h-2 ${ROADMAP_OPTIONS[status].bg} rounded-full `}
            ></span>
            <span className="text-base">{formatStatus(status)}</span>
          </div>
          <span className="text-base font-bold">{count}</span>
        </li>
      ))}
    </ul>
  );
}

export default RoadmapList;
