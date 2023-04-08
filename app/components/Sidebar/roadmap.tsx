import Link from "next/link";
import clsx from "clsx";
import RoadmapList from "./RoadmapList";
import { getPostByStatus } from "@/app/lib/prisma/post";
async function Roadmap() {
  const [livePosts, plannedPosts, inProgressPosts, suggestionPost] =
    await Promise.all([
      getPostByStatus("live"),
      getPostByStatus("planned"),
      getPostByStatus("in_progress"),
      getPostByStatus("suggestion"),
    ]);

  return (
    <div
      className={clsx(
        "md:flex-1 flex flex-col gap-6 justify-between bg-white p-6 pt-4 rounded-lg",
        "lg:flex-initial"
      )}
    >
      <div className="flex justify-between items-center  ">
        <h2 className=" text-lg text-brand-american_blue font-bold">Roadmap</h2>
        <Link
          href="/roadmap?status=suggestion"
          className="text-sm text-blue-400 self-end font-semibold transition-all duration-200 hover:underline"
        >
          View
        </Link>
      </div>
      <RoadmapList
        plannedPosts={{ status: "Planned", count: plannedPosts.length }}
        livePosts={{ status: "Live", count: livePosts.length }}
        inProgressPosts={{
          status: "In_Progress",
          count: inProgressPosts.length,
        }}
        suggestionPosts={{ status: "Suggestion", count: suggestionPost.length }}
      />
    </div>
  );
}

export default Roadmap;
