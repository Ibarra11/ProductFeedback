"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RoadmapRequestList from "./RoadmapRequestList";
import { FeedbackStatus, Post } from "@/types";
import clsx from "clsx";

function RoadmapTabs({
  tabs,
}: {
  tabs: Record<Exclude<FeedbackStatus, "suggestion">, Post[]>;
}) {
  const [status, setStatus] = React.useState<FeedbackStatus>("planned");
  return (
    <Tabs.Root
      value={status}
      onValueChange={(val) => setStatus(val as FeedbackStatus)}
      defaultValue="planned"
    >
      <Tabs.List
        className=" h-16 flex border-b border-b-brand-blue_gray mb-6"
        aria-label="select a product request status"
        defaultValue="planned"
      >
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
              status === "in-progress"
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
      {Object.entries(tabs).map(([postsStatus, posts]) => (
        <Tabs.Content className="px-6" key={postsStatus} value={postsStatus}>
          <RoadmapRequestList
            feedbackRequestList={posts}
            status={postsStatus as FeedbackStatus}
          />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

export default RoadmapTabs;
