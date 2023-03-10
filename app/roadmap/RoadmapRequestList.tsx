import RoadmapRequest from "./RoadmapRequest";
import { FeedbackStatus, Post } from "@/types";
import { formatStatus } from "../utils";
import clsx from "clsx";

const statusMap: Record<FeedbackStatus, string> = {
  planned: "Ideas prioritized for research",
  "in-progress": "Currently being developed",
  live: "Released features",
  suggestion: "",
};
function RoadmapRequestList({
  status,
  feedbackRequestList,
}: {
  status: FeedbackStatus;
  feedbackRequestList: Post[];
}) {
  return (
    <div className="flex-1">
      <div
        className={clsx("text-brand-american_blue mb-2", " md:mb-6", "lg:mb-4")}
      >
        <h2 className={clsx(" text-sm font-bold mb-2", "lg:text-lg lg:mb-1")}>
          {formatStatus(status)} ({feedbackRequestList.length})
        </h2>
        <p
          className={clsx(
            "text-sm text-brand-gray-blue opacity-75",
            "lg:text-base"
          )}
        >
          {statusMap[status]}
        </p>
      </div>
      <div className={clsx("flex flex-col gap-4", "md:gap-6")}>
        {feedbackRequestList.map((feedback) => (
          <RoadmapRequest key={feedback.id} {...feedback} />
        ))}
      </div>
    </div>
  );
}

export default RoadmapRequestList;
