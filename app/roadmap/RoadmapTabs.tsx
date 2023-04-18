"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RoadmapRequestList from "./RoadmapRequestList";
import { Status } from "@prisma/client";
import clsx from "clsx";
import RoadmapLoading from "./RoadmapLoading";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Post } from "../lib/prisma/post";

function RoadmapTabs({ status, posts }: { status: Status; posts: Post[] }) {
  const router = useRouter();
  const [direction, setDirection] = React.useState<1 | -1>();
  const [isAnimating, setIsAnimating] = React.useState(false);
  console.log(posts);
  return (
    <Tabs.Root
      className="h-full flex flex-col gap-6"
      data-id="root"
      value={status}
      onValueChange={(val) => {
        if (isAnimating) {
          return;
        }
        if (val === "suggestion") {
          setDirection(-1);
          React.startTransition(() => {
            router.push("/roadmap?status=suggestion");
          });
        } else if (val === "planned") {
          if (status === "in_progress") {
            setDirection(-1);
          } else {
            setDirection(1);
          }
          React.startTransition(() => {
            router.push("/roadmap?status=planned");
          });
        } else if (val === "in_progress") {
          if (status === "live") {
            setDirection(-1);
          } else {
            setDirection(1);
          }
          React.startTransition(() => {
            router.push("/roadmap?status=in_progress");
          });
        } else if (val === "live") {
          setDirection(1);
          React.startTransition(() => {
            router.push("/roadmap?status=live");
          });
        }
      }}
    >
      <Tabs.List
        className="h-16  flex border-b border-b-brand-blue_gray "
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
      <AnimatePresence
        onExitComplete={() => setIsAnimating(false)}
        initial={false}
        custom={direction}
        mode="popLayout"
      >
        <Tabs.Content
          className="overflow-hidden h-full"
          forceMount
          key={status}
          value={status}
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
            {/* <React.Suspense fallback={<RoadmapLoading />}> */}
            <RoadmapRequestList posts={posts} status={status} />
            {/* </React.Suspense> */}
          </motion.div>
        </Tabs.Content>
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
