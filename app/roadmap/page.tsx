import Header from "./Header";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { getPostByStatus } from "../lib/prisma/post";
import { prisma } from "@/db";
import { z, ZodUnion } from "zod";
import UserProvider from "../components/UserProvider";
import { redirect } from "next/navigation";

async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}

// async function getProductRequest() {
//   const plannedPosts = getPostByStatus("Planned");
//   const inProgressPosts = getPostByStatus("In_Progress");
//   const livePosts = getPostByStatus("Live");
//   const suggestionPosts = getPostByStatus("Suggestion");

//   const [planned, inProgress, live, suggestion, user] = await Promise.all([
//     plannedPosts,
//     inProgressPosts,
//     livePosts,
//     suggestionPosts,
//     getRandomUser(),
//   ]);

//   return { planned, inProgress, live, suggestion, user };
// }

const statusUnion = z.union([
  z.literal("live"),
  z.literal("planned"),
  z.literal("in_progress"),
  z.literal("suggestion"),
]);

const searchParamsSchema = z.object({
  status: statusUnion,
});

async function Page({ searchParams }: { searchParams: { status: string } }) {
  const currentStatus = searchParamsSchema.safeParse(searchParams);
  if (!currentStatus.success) {
    redirect("/");
  }
  const [user, posts] = await Promise.all([
    getRandomUser(),
    getPostByStatus(currentStatus.data.status),
  ]);

  // const { planned, inProgress, live, suggestion, user } =
  //   await getProductRequest();

  return (
    <UserProvider user={user}>
      <div className={clsx("flex flex-col", "md:gap-12")}>
        <Header />
        <div className="flex-1 h-full ">
          <div className={clsx("h-full")}>
            <RoadmapTabs status={currentStatus.data.status} posts={posts} />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default Page;
