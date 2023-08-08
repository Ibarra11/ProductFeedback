import clsx from "clsx";
import { ROADMAP_TAB_DESCRIPTION } from "@/app/constants";
import EmptySuggestionsView from "@/app/components/EmptySuggestionsView";
import { Status } from "@prisma/client";
import RoadmapPost from "./RoadmapPost";
import { getPostByStatus } from "@/app/lib/prisma";
import { formatStatus } from "@/app/utils";
interface Props {
  status: Status;
}

async function RoadmapPostList({ status }: Props) {
  const posts = await getPostByStatus(status);
  return (
    <div className="flex flex-1 flex-col h-full">
      <div
        className={clsx("text-brand-american_blue mb-2", " md:mb-6", "lg:mb-4")}
      >
        <h2 className={clsx(" text-sm font-bold mb-2", "lg:text-lg lg:mb-1")}>
          {formatStatus(status)} ({posts.length})
        </h2>
        <p
          className={clsx(
            "text-sm text-brand-gray-blue opacity-75",
            "lg:text-base"
          )}
        >
          {ROADMAP_TAB_DESCRIPTION[status]}
        </p>
      </div>
      <div className={clsx("flex-1")}>
        {posts.length > 0 && (
          <div
            className={clsx(
              "h-full content-start  grid grid-cols-1 gap-4",
              "md:gap-6 md:grid-cols-2",
              "lg:grid-cols-3"
            )}
          >
            {posts.map((post) => {
              return <RoadmapPost key={post.id} {...post} />;
            })}
          </div>
        )}

        {posts.length === 0 && (
          <div className="h-full">
            {" "}
            <EmptySuggestionsView />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapPostList;
