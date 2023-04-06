"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RoadmapRequestList from "./RoadmapRequestList";
import { FeedbackStatus } from "@/types";
import { Post } from "@prisma/client";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

function RoadmapTabs({
  tabs,
}: {
  tabs: Record<
    Post["status"],
    (Post & {
      _count: {
        upvotes: number;
        comments: number;
      };
    })[]
  >;
}) {
  const [status, setStatus] = React.useState<Post["status"]>("Suggestion");
  const [direction, setDirection] = React.useState<1 | -1>();
  const [isAnimating, setIsAnimating] = React.useState(false);
  console.log(Object.entries(tabs));

  return (
    <Tabs.Root
      data-id="root"
      value={status}
      onValueChange={(val) => {
        if (isAnimating) {
          return;
        }
        setStatus(val as Post["status"]);
        if (status === "Suggestion") {
          setDirection(1);
        } else if (status === "Planned") {
          if (val === "In-Progress") {
            setDirection(-1);
          } else {
            setDirection(1);
          }
        } else if (status === "In_Progress") {
          if (val === "Planned") {
            setDirection(-1);
          } else {
            setDirection(1);
          }
        } else if (status === "Live") {
          setDirection(-1);
        }
      }}
    >
      <Tabs.List
        className=" h-16 flex border-b border-b-brand-blue_gray mb-6"
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
          value="Suggestion"
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
          value="Planned"
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
          value="In_Progress"
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
          value="Live"
        >
          Live
        </Tabs.Trigger>
      </Tabs.List>
      <AnimatePresence
        onExitComplete={() => setIsAnimating(false)}
        initial={false}
        custom={direction}
        mode="popLayout"
      >
        {Object.entries(tabs)
          .filter(([postStatus]) => postStatus === status)
          .map(([postsStatus, posts]) => (
            <Tabs.Content
              className="px-6"
              forceMount
              key={postsStatus}
              value={postsStatus}
            >
              <motion.div
                data-id="container"
                initial="enter"
                animate="middle"
                exit="exit"
                key={status}
                custom={direction}
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <RoadmapRequestList
                  feedbackRequestList={posts}
                  status={postsStatus as Post["status"]}
                />
              </motion.div>
            </Tabs.Content>
          ))}
      </AnimatePresence>
    </Tabs.Root>
  );
}

const variants: Record<string, (direction: number) => { x: string | number }> =
  {
    enter: (direction) => ({ x: `${100 * direction}%` }),
    middle: (direction) => ({ x: 0 }),
    exit: (direction) => ({
      x: `${-100 * direction}%`,
    }),
  };

export default RoadmapTabs;
