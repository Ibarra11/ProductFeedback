"use client";
import * as Tabs from "@radix-ui/react-tabs";
import RoadmapRequestList from "./RoadmapRequestList";
import { FeedbackStatus, Post } from "@/types";
import { formatStatus } from "../utils";

function RoadmapTabs({
  tabs,
}: {
  tabs: Record<Exclude<FeedbackStatus, "suggestion">, Post[]>;
}) {
  return (
    <Tabs.Root defaultValue="planned">
      <Tabs.List
        className=" h-16 flex border-b border-b-brand-blue_gray mb-6"
        aria-label="select a product request status"
        defaultValue="planned"
      >
        <Tabs.Trigger className="flex-1" value="planned">
          Planned
        </Tabs.Trigger>
        <Tabs.Trigger className="flex-1" value="in-progress">
          In-Progress
        </Tabs.Trigger>
        <Tabs.Trigger className="flex-1" value="live">
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
