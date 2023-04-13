import { SortByTypes } from "@/types";
import { Status } from "@prisma/client";
import type { Post } from "../lib/prisma/post";
export function sortPosts(posts: Post[], sortBy: SortByTypes): Post[] {
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
    case "Date Posted": {
      return posts;
    }
  }
}

export function formatStatus(status: Status) {
  return status === "in_progress"
    ? `${status[0].toUpperCase()}${status[1].toLowerCase()}-${status[3].toUpperCase()}${status
        .slice(4)
        .toLowerCase()}`
    : status[0].toUpperCase() + status.slice(1).toLowerCase();
}

export function convertDateToString(date: Date) {
  const stringDate = date
    .toLocaleString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(", ")
    .join(" ");
  return stringDate;
}

export function filterPostsByStatus(posts: Post[]) {
  const postStatusObj: Record<Status, { status: Status; count: number }> = {
    live: { status: "live", count: 0 },
    in_progress: { status: "in_progress", count: 0 },
    planned: { status: "planned", count: 0 },
    suggestion: { status: "suggestion", count: 0 },
  };

  posts.forEach((post) => {
    postStatusObj[post.status].count++;
  });

  return postStatusObj;
}
