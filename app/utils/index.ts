import { SortByTypes, FeedbackStatus } from "@/types";

import type { Post } from "../lib/prisma/post";
export function sortPosts(posts: Post[], sortBy: SortByTypes) {
  switch (sortBy) {
    case "Most Comments": {
      return posts.sort((a, b) => b._count.comments - a._count.comments);
    }
    case "Least Comments": {
      return posts.sort((a, b) => a._count.comments - b._count.comments);
    }
    case "Most Upvotes": {
      return posts.sort((a, b) => b.upvotes - a.upvotes);
    }
    case "Least Upvotes": {
      return posts.sort((a, b) => a.upvotes - b.upvotes);
    }
  }
}

export function formatStatus(status: Post["status"]) {
  return status === "IN_PROGRESS"
    ? `${status[0].toUpperCase()}${status[1].toLowerCase()}-${status[3].toUpperCase()}${status
        .slice(4)
        .toLowerCase()}`
    : status[0].toUpperCase() + status.slice(1).toLowerCase();
}
