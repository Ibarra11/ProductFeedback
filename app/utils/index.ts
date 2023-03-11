import { SortByTypes, FeedbackStatus } from "@/types";
import { Post } from "@prisma/client";
// export function sortPosts(posts: Post[], sortBy: SortByTypes) {
//   switch (sortBy) {
//     case "Most Comments": {
//       return posts.sort(
//         (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
//       );
//     }
//     case "Least Comments": {
//       return posts.sort(
//         (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
//       );
//     }
//     case "Most Upvotes": {
//       return posts.sort((a, b) => b.upvotes - a.upvotes);
//     }
//     case "Least Upvotes": {
//       return posts.sort((a, b) => a.upvotes - b.upvotes);
//     }
//   }
// }

export function formatStatus(status: FeedbackStatus) {
  return status === "in-progress"
    ? `${status[0].toUpperCase()}${
        status[1]
      }-${status[3].toUpperCase()}${status.slice(4)}`
    : status[0].toUpperCase() + status.slice(1);
}
