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
  tabs: Record<Exclude<Post["status"], "SUGGESTION">, Post[]>;
}) {
  const [status, setStatus] = React.useState<FeedbackStatus>("planned");
  const [direction, setDirection] = React.useState<1 | -1>();
  const [isAnimating, setIsAnimating] = React.useState(false);

  return (
    <Tabs.Root
      data-id="root"
      value={status}
      onValueChange={(val) => {
        if (isAnimating) {
          return;
        }
        setStatus(val as FeedbackStatus);
        if (status === "planned") {
          setDirection(1);
        } else if (status === "in-progress") {
          if (val === "planned") {
            setDirection(-1);
          } else {
            setDirection(1);
          }
        } else if (status === "live") {
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
                {/* <RoadmapRequestList
                  feedbackRequestList={posts}
                  status={postsStatus as Post["status"]}
                /> */}
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
