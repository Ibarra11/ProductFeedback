"use client";
import clsx from "clsx";
import CommentIcon from "../components/CommentIcon";
import CounterButton from "../components/CounterButton";
import { Post } from "../../types";
import { roadmapBorderColor, ROADMAP_CIRCLE_BG } from "../constants";
import { formatStatus } from "../utils";
import Link from "next/link";
function RoadmapRequest({
  id,
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
    <Link
      href={`/post/${id}`}
      className={clsx(
        `group border-t-[5px] ${borderColor}`,
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
        <h3
          className={clsx(
            "font-bold text-lg text-brand-american_blue",
            `group-hover:text-brand-royal_blue transition-colors duration-200`
          )}
        >
          {title}
        </h3>
        <p className="text-base text-brand-blue_gray">{description}</p>
      </div>

      <div className="inline-block rounded-lg bg-brand-alice_blue px-4 py-1 text-brand-american_blue mb-4">
        <h4 className="text-sm text-brand-royal_blue font-semibold">
          {category[0].toUpperCase() + category.slice(1)}
        </h4>
      </div>
      <div className="flex justify-between items-center">
        <CounterButton
          selected={false}
          direction="row"
          value={upvotes}
          onClick={() => {
            alert(id);
          }}
        />
        <CommentIcon comments={comments ? comments.length : 0} />
      </div>
    </Link>
  );
}

export default RoadmapRequest;
