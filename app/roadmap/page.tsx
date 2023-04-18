import Header from "./Header";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { getPostByStatus } from "../lib/prisma/post";
import { prisma } from "@/db";
import { z } from "zod";
import UserProvider from "../components/UserProvider";
import { redirect } from "next/navigation";
import { convertDateToString } from "../utils";

async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}

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

  const postsPromise = getPostByStatus(currentStatus.data.status).then(
    (data) => {
      return data.map((post) => ({
        ...post,
        createdAt: convertDateToString(post.createdAt),
      }));
    }
  );

  const [user, posts] = await Promise.all([getRandomUser(), postsPromise]);
  return (
    <UserProvider user={user}>
      <div
        className={clsx(
          "flex h-full flex-col border-2 border-blue-600",
          "md:gap-12"
        )}
      >
        <Header />
        <div className="flex-1 ">
          <RoadmapTabs status={currentStatus.data.status} posts={posts} />
        </div>
      </div>
    </UserProvider>
  );
}

export default Page;
