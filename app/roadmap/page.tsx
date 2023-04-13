import Header from "./Header";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { getPostByStatus } from "../lib/prisma/post";
import { prisma } from "@/db";
import { z } from "zod";
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

  const user = await getRandomUser();
  const postsPromise = getPostByStatus(currentStatus.data.status);

  return (
    <UserProvider user={user}>
      <div className={clsx("flex flex-col", "md:gap-12")}>
        <Header />
        <div className="flex-1 h-full ">
          <div className={clsx("h-full")}>
            <RoadmapTabs
              status={currentStatus.data.status}
              postsPromise={postsPromise}
            />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

export default Page;
