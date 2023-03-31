import Header from "./Header";
import RoadmapRequestList from "./RoadmapRequestList";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { prisma } from "@/db";
async function getProductRequest() {
  const plannedPosts = prisma.post.findMany({
    where: {
      status: {
        equals: "PLANNED",
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const inProgressPosts = prisma.post.findMany({
    where: {
      status: {
        equals: "IN_PROGRESS",
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  const livePosts = prisma.post.findMany({
    where: {
      status: {
        equals: "LIVE",
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  const [planned, inProgress, live] = await Promise.all([
    plannedPosts,
    inProgressPosts,
    livePosts,
  ]);

  return { planned, inProgress, live };
}

async function Page() {
  const { planned, inProgress, live } = await getProductRequest();

  return (
    <div className={clsx("flex flex-col", "md:gap-12")}>
      <Header />
      <div className="flex-1 h-full ">
        {/* tablet to desktop view */}
        <div className={clsx("hidden", "md:flex md:gap-7")}>
          <RoadmapRequestList status="PLANNED" feedbackRequestList={planned} />
          <RoadmapRequestList
            status="IN_PROGRESS"
            feedbackRequestList={inProgress}
          />
          <RoadmapRequestList status="LIVE" feedbackRequestList={live} />
        </div>
        {/* mobile view */}
        <div className={clsx("h-full", "md:hidden")}>
          <RoadmapTabs
            tabs={{ PLANNED: planned, IN_PROGRESS: inProgress, LIVE: live }}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
