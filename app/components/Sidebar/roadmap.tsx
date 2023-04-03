import Link from "next/link";
import clsx from "clsx";
import RoadmapList from "./RoadmapList";
import { getPostByStatus } from "@/app/lib/prisma/post";
async function Roadmap() {
  const [livePosts, plannedPosts, inProgressPosts] = await Promise.all([
    getPostByStatus("LIVE"),
    getPostByStatus("PLANNED"),
    getPostByStatus("IN_PROGRESS"),
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
          href="/roadmap"
          className="text-sm text-blue-400 self-end font-semibold transition-all duration-200 hover:underline"
        >
          View
        </Link>
      </div>
      <RoadmapList
        plannedPosts={{ status: "PLANNED", count: plannedPosts.length }}
        livePosts={{ status: "LIVE", count: livePosts.length }}
        inProgressPosts={{
          status: "IN_PROGRESS",
          count: inProgressPosts.length,
        }}
      />
    </div>
  );
}

export default Roadmap;
