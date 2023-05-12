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
      className="relative  h-full pt-4 md:p-0 flex flex-col gap-6"
      data-id="root"
      value={status}
      onValueChange={(val) => {
        // @ts-ignore
        router.push(`/roadmap?status=${val}`);
      }}
    >
      <TabsList status={status} />

      <Tabs.Content className="flex-1" forceMount key={status} value={status}>
        {children}
      </Tabs.Content>
    </Tabs.Root>
  );
}

function TabsList({ status }: { status: Status }) {
  return (
    <Tabs.List
      className="hidden md:flex h-16 border-b border-b-brand-blue_gray "
      aria-label="select a product request status"
    >
      <Tabs.Trigger
        className={clsx(
          "flex-1",
          `${
            status === "Suggestion"
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
            status === "Planned"
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
            status === "In_Progress"
              ? "border-b-4 border-b-brand-purple outline-none"
              : "opacity-40"
          }`
        )}
        value="in-progress"
      >
        In-Progress
      </Tabs.Trigger>
      <Tabs.Trigger
        className={clsx(
          "flex-1",
          `${
            status === "Live"
              ? "border-b-4 border-b-brand-maya_blue outline-none"
              : "opacity-40"
          }`
        )}
        value="live"
      >
        Live
      </Tabs.Trigger>
    </Tabs.List>
  );
}
export default RoadmapTabs;
