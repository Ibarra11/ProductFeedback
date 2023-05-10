import { SortByTypes } from "@/types";
import { Status } from "@prisma/client";
import type { Post } from "../lib/prisma/Post";
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

export function formatStatus(status: Status): Status {
  return status === "In_Progress" ? (status.replace("_", "-") as any) : status;
}

export function filterPostsByStatus(posts: Post[]) {
  const postStatusObj: Record<Status, { status: Status; count: number }> = {
    Live: { status: "Live", count: 0 },
    In_Progress: { status: "In_Progress", count: 0 },
    Planned: { status: "Planned", count: 0 },
    Suggestion: { status: "Suggestion", count: 0 },
  };

  posts.forEach((post) => {
    postStatusObj[post.status].count++;
  });

  return postStatusObj;
}
