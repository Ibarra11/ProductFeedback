"use client";
import clsx from "clsx";
import CommentIcon from "../components/CommentIcon";
import { useUserContext } from "../components/UserProvider";
import CounterButton from "../components/CounterButton";
import { ROADMAP_OPTIONS } from "../constants";
import { formatStatus } from "../utils";
import Link from "next/link";
import { Post } from "../lib/prisma/post";
function RoadmapRequest({
  post_id,
  status,
  title,
  content,
  category,
  _count: { comments, upvotes },
}: Post) {
  const { border, bg } = ROADMAP_OPTIONS[status];
  const user = useUserContext();
  const upvote = user.Upvotes.find((upvote) => upvote.post_fk_id === post_id);

  return (
    <Link
      onClick={(e) => console.log("link click")}
      href={`/post/${post_id}`}
      className={clsx(
        `group border-t-[5px] ${border}`,
        "bg-white p-8 rounded-md"
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-2 mb-4",
          "md:gap-4 md:mb-3",
          "lg:mb-2"
        )}
      >
        <span className={clsx(`${bg}`, "w-2 h-2 rounded-full")}></span>
        <p
          className={clsx(
            "text-sm text-brand-gray-blue opacity-50",
            "lg:text-base"
          )}
        >
          {formatStatus(status)}
        </p>
      </div>
      <div className={clsx("mb-2", "md:mb-6", "lg:mb-4")}>
        <h3
          className={clsx(
            "text-sm font-bold  text-brand-american_blue mb-2",
            "lg:text-lg lg:mb-1",
            `group-hover:text-brand-royal_blue transition-colors duration-200`
          )}
        >
          {title}
        </h3>
        <p className={clsx("text-sm text-brand-blue_gray", "lg:text-base ")}>
          {content}
        </p>
      </div>

      <div className="inline-block rounded-lg bg-brand-alice_blue px-4 py-1 text-brand-american_blue mb-4">
        <h4 className="text-sm text-brand-royal_blue font-semibold">
          {category[0] + category.slice(1).toLowerCase()}
        </h4>
      </div>
      <div className="flex justify-between items-center ">
        <CounterButton
          postId={post_id}
          userId={user.user_id}
          upvoteCount={upvotes}
          upvoteId={upvote && upvote.upvote_id}
          selected={false}
          direction="row"
          value={upvotes}
        />
        <CommentIcon comments={comments} />
      </div>
    </Link>
  );
}

export default RoadmapRequest;
