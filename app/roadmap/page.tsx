import Header from "./Header";
import clsx from "clsx";
import { prisma } from "@/db";
import { z } from "zod";
import UserProvider from "../components/UserProvider";
import { redirect } from "next/navigation";
import React from "react";
import RoadmapView from "./RoadmapView";
import MobileRoadmapView from "./MobileRoadmapView";
import { getPostByStatus } from "../lib/prisma/post";
import { convertDateToString, formatStatus } from "../utils";
import PostsProvider from "../components/PostsProvider";
import { Status } from "@prisma/client";

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
  z.literal("live"),
  z.literal("planned"),
  z.literal("in-progress"),
  z.literal("suggestion"),
]);

const searchParamsSchema = z.object({
  status: statusUnion,
});

function delay(ms: number, data: any) {
  return new Promise((res) => {
    setTimeout(() => res(data), ms);
  });
}

function transformStatus(rawStatus: z.infer<typeof statusUnion>): Status {
  if (rawStatus === "in-progress") {
    return rawStatus
      .split("-")
      .map((str) => str[0].toUpperCase() + str.slice(1))
      .join("_") as any;
  }
  return (rawStatus[0].toUpperCase() + rawStatus.slice(1)) as any;
}

async function Page({ searchParams }: { searchParams: { status: string } }) {
  const rawInput = searchParamsSchema.safeParse(searchParams);
  if (!rawInput.success) {
    redirect("/");
  }
  /*
  I just convert the status from lowercase to how they are stored in the db.  I just think it looks better lowercase.
  suggestion => Suggestion
  in-progress => In_Progress
  */
  const status = transformStatus(rawInput.data.status as any);

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
      <PostsProvider>
        <div className={clsx("flex h-full flex-col ", "md:gap-12")}>
          <Header />
          <div className="flex-1">
            <RoadmapView
              postsPromise={postsPromise}
              user={user}
              status={status}
            />
            <MobileRoadmapView
              user={user}
              postsPromise={postsPromise}
              status={status}
            />
          </div>
        </div>
      </PostsProvider>
    </UserProvider>
  );
}

export default Page;
