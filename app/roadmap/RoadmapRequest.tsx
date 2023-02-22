"use client";
import clsx from "clsx";
import CommentIcon from "../components/CommentIcon";
import CounterButton from "../components/CounterButton";
import { Post } from "../../types";
import { roadmapBorderColor, ROADMAP_CIRCLE_BG } from "../constants";
import { formatStatus } from "../utils";
function RoadmapRequest({
  status,
  title,
  description,
  upvotes,
  category,
  comments,
}: Post) {
  const borderColor = roadmapBorderColor[status];
  const statusCircle = ROADMAP_CIRCLE_BG[status];
  return (
    <div
      className={clsx(
        ` border-t-[5px] ${borderColor}`,
        "bg-white p-8 rounded-md"
      )}
    >
      <div className="flex items-center gap-4">
        <span
          className={clsx(`${statusCircle}`, "w-2 h-2 rounded-full")}
        ></span>
        <p className="text-brand-gray-blue opacity-50">
          {formatStatus(status)}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-base">{description}</p>
      </div>

      <div className="inline-block rounded-lg bg-brand-alice_blue px-4 py-1 text-brand-american_blue mb-4">
        <h4 className="text-sm font-semibold">
          {category[0].toUpperCase() + category.slice(1)}
        </h4>
      </div>
      <div className="flex justify-between">
        <CounterButton
          selected={false}
          direction="row"
          value={upvotes}
          onClick={() => {}}
        />
        <CommentIcon comments={comments ? comments.length : 0} />
      </div>
    </div>
  );
}

export default RoadmapRequest;
