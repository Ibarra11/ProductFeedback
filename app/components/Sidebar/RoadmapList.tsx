"use client";
import { ROADMAP_OPTIONS } from "@/app/constants";
import { filterPostsByStatus, formatStatus } from "@/app/utils";
import { usePostsContext } from "../PostsProvider";
import { use } from "react";
import { Category, Status } from "@prisma/client";

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
        comments: number;
        upvotes: number;
      };
    }[]
  >;
}

function RoadmapList({ postsPromise }: Props) {
  const posts = use(postsPromise);
  const { getFilteredPosts } = usePostsContext();
  const currentPosts = getFilteredPosts(posts);
  const { planned, in_progress, live, suggestion } =
    filterPostsByStatus(currentPosts);
  return (
    <ul className="flex flex-col gap-2 text-brand-blue_gray">
      {[planned, in_progress, live, suggestion].map(({ status, count }) => (
        <li
          key={`${status}`}
          aria-label={status}
          className="flex gap-4 justify-between"
        >
          <div className="flex items-center gap-4 ">
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
