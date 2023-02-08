import { Post, SortByTypes } from "@/types";
export function sortPosts(posts: Post[], sortBy: SortByTypes) {
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
