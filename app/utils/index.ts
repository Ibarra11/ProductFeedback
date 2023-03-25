import { SortByTypes, FeedbackStatus } from "@/types";
import { Post, Comment } from "@prisma/client";
import { Type_Post } from "../lib/prisma/post";
export function sortPosts(posts: Type_Post, sortBy: SortByTypes) {
  switch (sortBy) {
    case "Most Comments": {
      return posts.sort(
        (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
      );
    }
    case "Least Comments": {
      return posts.sort(
        (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
      );
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
