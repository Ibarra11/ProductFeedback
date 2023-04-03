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
}
function RoadmapList({ plannedPosts, inProgressPosts, livePosts }: Props) {
  return (
    <ul className="flex flex-col gap-2 text-brand-blue_gray">
      {[plannedPosts, inProgressPosts, livePosts].map(({ status, count }) => (
        <li
          key={`${status}`}
          aria-label={status}
          className="flex gap-4 justify-between"
        >
          <div className="flex items-center gap-4 ">
            <span
              className={`inline-block w-2 h-2 ${ROADMAP_OPTIONS[status]} rounded-full `}
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
