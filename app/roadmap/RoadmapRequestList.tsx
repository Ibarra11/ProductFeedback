import RoadmapRequest from "./RoadmapRequest";
import { FeedbackStatus, Post } from "@/types";
import { formatStatus } from "../utils";

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
      <div className="text-brand-american_blue mb-8">
        <h2 className=" text-lg font-bold mb-1">
          {formatStatus(status)} ({feedbackRequestList.length})
        </h2>
        <p>{statusMap[status]}</p>
      </div>
      <div className="flex flex-col gap-6">
        {feedbackRequestList.map((feedback) => (
          <RoadmapRequest key={feedback.id} {...feedback} />
        ))}
      </div>
    </div>
  );
}

export default RoadmapRequestList;
