import Header from "./Header";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { prisma } from "@/db";
import { z } from "zod";
import UserProvider from "../components/UserProvider";
import { redirect } from "next/navigation";
import React from "react";
import RoadmapView from "./RoadmapView";
import MobileRoadmapView from "./MobileRoadmapView";
import { getPostByStatus } from "../lib/prisma/post";
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

const statusUnion = z.union([
  z.literal("Live"),
  z.literal("Planned"),
  z.literal("In_Progress"),
  z.literal("Suggestion"),
]);

const searchParamsSchema = z.object({
  status: statusUnion,
});

function delay(ms: number, data: any) {
  return new Promise((res) => {
    setTimeout(() => res(data), ms);
  });
}

async function Page({ searchParams }: { searchParams: { status: string } }) {
  const data = searchParamsSchema.safeParse(searchParams);
  if (!data.success) {
    redirect("/");
  }
  const {
    data: { status },
  } = data;

  const user = await getRandomUser();
  const postsPromise = getPostByStatus(status).then((data) => {
    const newPosts = data.map((post) => ({
      ...post,
      createdAt: convertDateToString(post.createdAt),
    }));
    return delay(500, newPosts) as Promise<typeof newPosts>;
  });
  return (
    <UserProvider user={user}>
      <div className={clsx("flex h-full flex-col ", "md:gap-12")}>
        <Header />
        <div className="flex-1">
          <RoadmapView user={user} status={status} />
          <MobileRoadmapView
            user={user}
            postsPromise={postsPromise}
            status={status}
          />
        </div>
      </div>
    </UserProvider>
  );
}

export default Page;
