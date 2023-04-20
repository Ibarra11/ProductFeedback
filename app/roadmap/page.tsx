import Header from "./Header";
import RoadmapTabs from "./RoadmapTabs";
import clsx from "clsx";
import { prisma } from "@/db";
import { z } from "zod";
import UserProvider from "../components/UserProvider";
import { redirect } from "next/navigation";
import RoadmapRequestList from "./RoadmapRequestList";
import React from "react";
import RoadmapLoading from "./RoadmapLoading";

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
  return (
    <UserProvider user={user}>
      <div className={clsx("flex h-full flex-col ", "md:gap-12")}>
        <Header />
        <div className="flex-1 ">
          <RoadmapTabs status={currentStatus.data.status}>
            <React.Suspense fallback={<RoadmapLoading />}>
              {/* @ts-expect-error Server Component */}
              <RoadmapRequestList
                user={user}
                status={currentStatus.data.status}
              />
            </React.Suspense>
          </RoadmapTabs>
        </div>
      </div>
    </UserProvider>
  );
}

export default Page;
