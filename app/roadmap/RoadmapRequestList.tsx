import RoadmapRequest from "./RoadmapRequest";
import { convertDateToString, formatStatus } from "../utils";
import clsx from "clsx";
import { getPostByStatus, Post } from "../lib/prisma/post";
import { ROADMAP_TAB_DESCRIPTION } from "../constants";
import { Status, Upvotes, User } from "@prisma/client";

interface Props {
  status: Status;
  user: User & {
    Upvotes: Upvotes[];
  };
}
async function RoadmapRequestList({ status, user }: Props) {
  const posts = await getPostByStatus(status).then((data) => {
    return data.map((post) => ({
      ...post,
      createdAt: convertDateToString(post.createdAt),
    }));
  });
  return (
    <div className="flex-1">
      <div
        className={clsx("text-brand-american_blue mb-2", " md:mb-6", "lg:mb-4")}
      >
        <h2 className={clsx(" text-sm font-bold mb-2", "lg:text-lg lg:mb-1")}>
          {formatStatus(status)} ({posts.length})
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
      <div className={clsx("grid grid-cols-3 gap-4", "md:gap-6")}>
        {posts.map((feedback) => {
          return (
            <RoadmapRequest user={user} key={feedback.post_id} {...feedback} />
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapRequestList;
