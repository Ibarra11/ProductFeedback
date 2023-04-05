import { ROADMAP_OPTIONS } from "@/app/constants";
import { formatStatus } from "@/app/utils";
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
function RoadmapList({
  plannedPosts,
  inProgressPosts,
  livePosts,
  suggestionPosts,
}: Props) {
  return (
    <ul className="flex flex-col gap-2 text-brand-blue_gray">
      {[plannedPosts, inProgressPosts, livePosts, suggestionPosts].map(
        ({ status, count }) => (
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
        )
      )}
    </ul>
  );
}

export default RoadmapList;
