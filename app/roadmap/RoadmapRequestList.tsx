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
      <div className={clsx("text-brand-american_blue mb-6", " md:mb-8")}>
        <h2 className=" text-lg font-bold mb-1">
          {formatStatus(status)} ({feedbackRequestList.length})
        </h2>
        <p className="text-brand-gray-blue opacity-75">{statusMap[status]}</p>
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
