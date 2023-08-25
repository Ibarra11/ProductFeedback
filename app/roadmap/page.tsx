import { z } from "zod";
import UserProvider from ".@/components/UserProvider";
import { redirect } from "next/navigation";
import React from "react";
import RoadmapView from "@/components/RoadmapView";
import MobileRoadmapView from "@/components/MobileRoadmapView";
import { getPostByStatus } from "../../lib/prisma/Post";
import { Status } from "@prisma/client";
import { getCurrentUser } from "../../lib/auth/session";
import { STATUS_VALUES } from "../constants";
export const dynamic = "force-dynamic";
export const revalidate = 0;
/* 
  The db stores status as Suggestion | Bug and so I want to use zod to verify that choose a correct status value.  However, I don't want the url to be uppercase like /roadmap?status=Suggestion.  So, I cant use the Status enum from the db to verify the status value, so I just parse it through a custom validation.
  */
const statusUnion = z
  .string()
  .refine((val) => {
    const statusValues = STATUS_VALUES;
    const statusResult = statusValues.find((status) => {
      if (status.toLowerCase() === val) {
        return true;
      }
    });
    if (!statusResult) {
      return false;
    }
    return true;
  })
  .transform((arg) => {
    const statusValues = Object.keys(Status);
    const statusResult = statusValues.find((status) => {
      if (status.toLowerCase() === arg) {
        return true;
      }
    });
    return statusResult!;
  });

const searchParamsSchema = z.object({
  status: statusUnion,
});

export type Roadmap_Post = Awaited<ReturnType<typeof getPostByStatus>>[0];

async function Page({ searchParams }: { searchParams: { status: string } }) {
  const user = await getCurrentUser();
  const rawInput = searchParamsSchema.safeParse(searchParams);
  if (!rawInput.success) {
    redirect("/");
  }
  const { status } = rawInput.data;
  return (
    <UserProvider user={user}>
      <RoadmapView status={status as Status} />
      <MobileRoadmapView status={status as Status} />
    </UserProvider>
  );
}

export default Page;
