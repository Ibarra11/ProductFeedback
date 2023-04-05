import { SortByTypes, FeedbackStatus } from "@/types";
import type { T_PostWithComemntCount } from "../lib/prisma/post";
export function sortPosts(
  posts: T_PostWithComemntCount[],
  sortBy: SortByTypes
) {
  switch (sortBy) {
    case "Most Comments": {
      return posts.sort((a, b) => b._count.comments - a._count.comments);
    }
    case "Least Comments": {
      return posts.sort((a, b) => a._count.comments - b._count.comments);
    }
    case "Most Upvotes": {
      return posts.sort((a, b) => b._count.upvotes - a._count.upvotes);
    }
    case "Least Upvotes": {
      return posts.sort((a, b) => a._count.upvotes - b._count.upvotes);
    }
  }
}

export function formatStatus(status: T_PostWithComemntCount["status"]) {
  return status === "IN_PROGRESS"
    ? `${status[0].toUpperCase()}${status[1].toLowerCase()}-${status[3].toUpperCase()}${status
        .slice(4)
        .toLowerCase()}`
    : status[0].toUpperCase() + status.slice(1).toLowerCase();
}
