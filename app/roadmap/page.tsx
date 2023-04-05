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
  const plannedPosts = getPostByStatus("Planned");
  const inProgressPosts = getPostByStatus("In_Progress");
  const livePosts = getPostByStatus("Live");
  const suggestionPosts = getPostByStatus("Suggestion");

  const [planned, inProgress, live, suggestion, user] = await Promise.all([
    plannedPosts,
    inProgressPosts,
    livePosts,
    suggestionPosts,
    getRandomUser(),
  ]);

  return { planned, inProgress, live, suggestion, user };
}

async function Page() {
  const { planned, inProgress, live, suggestion, user } =
    await getProductRequest();

  return (
    <UserProvider user={user}>
      <div className={clsx("flex flex-col", "md:gap-12")}>
        <Header />
        <div className="flex-1 h-full ">
          {/* tablet to desktop view */}
          <div className={clsx("hidden", "md:flex md:gap-7")}>
            <RoadmapRequestList
              status="Planned"
              feedbackRequestList={planned}
            />
            <RoadmapRequestList
              status="In_Progress"
              feedbackRequestList={inProgress}
            />
            <RoadmapRequestList status="Live" feedbackRequestList={live} />
          </div>
          {/* mobile view */}
          <div className={clsx("h-full", "md:hidden")}>
            <RoadmapTabs
              tabs={{
                Suggestion: suggestion,
                Planned: planned,
                In_Progress: inProgress,
                Live: live,
              }}
            />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default Page;
