"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Status } from "@prisma/client";
import clsx from "clsx";

import { useRouter } from "next/navigation";
interface Props {
  status: Status;
}

function RoadmapTabs({ children, status }: React.PropsWithChildren<Props>) {
  const router = useRouter();

  return (
    <Tabs.Root
      className="h-full flex flex-col gap-6"
      data-id="root"
      value={status}
      onValueChange={(val) => {
        router.push(`/roadmap?status=${val}`);
      }}
    >
      <Tabs.List
        className="h-16 flex border-b border-b-brand-blue_gray "
        aria-label="select a product request status"
      >
        <Tabs.Trigger
          className={clsx(
            "flex-1",
            `${
              status === "suggestion"
                ? "border-b-4 border-b-green-500 outline-none"
                : "opacity-40"
            }`
          )}
          value="suggestion"
        >
          Suggestion
        </Tabs.Trigger>
        <Tabs.Trigger
          className={clsx(
            "flex-1",
            `${
              status === "planned"
                ? "border-b-4 border-b-brand-tangerine outline-none"
                : "opacity-40"
            }`
          )}
          value="planned"
        >
          Planned
        </Tabs.Trigger>
        <Tabs.Trigger
          className={clsx(
            "flex-1",
            `${
              status === "in_progress"
                ? "border-b-4 border-b-brand-purple outline-none"
                : "opacity-40"
            }`
          )}
          value="in_progress"
        >
          In-Progress
        </Tabs.Trigger>
        <Tabs.Trigger
          className={clsx(
            "flex-1",
            `${
              status === "live"
                ? "border-b-4 border-b-brand-maya_blue outline-none"
                : "opacity-40"
            }`
          )}
          value="live"
        >
          Live
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content
        className="flex-1 px-6 "
        forceMount
        key={status}
        value={status}
      >
        {children}
      </Tabs.Content>
    </Tabs.Root>
  );
}
export default RoadmapTabs;
