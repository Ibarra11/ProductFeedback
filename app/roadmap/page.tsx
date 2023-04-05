import Header from "./Header";
import RoadmapRequestList from "./RoadmapRequestList";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { getPostByStatus } from "../lib/prisma/post";
import { prisma } from "@/db";
import UserProvider from "../components/UserProvider";
async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}
async function getProductRequest() {
  const plannedPosts = getPostByStatus("PLANNED");
  const inProgressPosts = getPostByStatus("IN_PROGRESS");
  const livePosts = getPostByStatus("LIVE");

  const [planned, inProgress, live, user] = await Promise.all([
    plannedPosts,
    inProgressPosts,
    livePosts,
    getRandomUser(),
  ]);

  return { planned, inProgress, live, user };
}

async function Page() {
  const { planned, inProgress, live, user } = await getProductRequest();

  return (
    <UserProvider user={user}>
      <div className={clsx("flex flex-col", "md:gap-12")}>
        <Header />
        <div className="flex-1 h-full ">
          {/* tablet to desktop view */}
          <div className={clsx("hidden", "md:flex md:gap-7")}>
            <RoadmapRequestList
              status="PLANNED"
              feedbackRequestList={planned}
            />
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
    </UserProvider>
  );
}

export default Page;
