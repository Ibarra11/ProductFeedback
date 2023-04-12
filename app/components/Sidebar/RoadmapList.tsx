import { ROADMAP_OPTIONS } from "@/app/constants";
import { Post } from "@/app/lib/prisma/post";
import { filterPostsByStatus, formatStatus } from "@/app/utils";
import { Status } from "@prisma/client";
type RoadmapOption = {
  status: Status;
  count: number;
};
interface Props {
  plannedPosts: RoadmapOption;
  livePosts: RoadmapOption;
  inProgressPosts: RoadmapOption;
  suggestionPosts: RoadmapOption;
}
function RoadmapList({ posts }: { posts: Post[] }) {
  const { planned, in_progress, live, suggestion } = filterPostsByStatus(posts);
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
