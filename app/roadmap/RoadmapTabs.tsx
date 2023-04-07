"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RoadmapRequestList from "./RoadmapRequestList";
import { Post, Status } from "@prisma/client";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// {
//   tabs: Record<
//     Post["status"],
//     (Post & {
//       _count: {
//         upvotes: number;
//         comments: number;
//       };
//     })[]
//   >;
// }

function RoadmapTabs({
  status,
  posts,
}: {
  status: Status;
  posts: (Post & {
    _count: {
      upvotes: number;
      comments: number;
    };
  })[];
}) {
  // const [status, setStatus] = React.useState<Post["status"]>("Suggestion");
  const router = useRouter();
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

        // setStatus(val as Post["status"]);
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
        className=" h-16 flex border-b border-b-brand-blue_gray mb-6"
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
        <Tabs.Content className="px-6" forceMount key={status} value={status}>
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
            <RoadmapRequestList feedbackRequestList={posts} status={status} />

            {/* <h1>Helo</h1> */}
          </motion.div>
        </Tabs.Content>
        {/* {Object.entries(tabs)
          .filter(([postStatus]) => postStatus === status) */}
        {/* {posts.map(({ post_id }) => (
          <Tabs.Content
            className="px-6"
            forceMount
            key={post_id}
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
              <RoadmapRequestList feedbackRequestList={posts} status={status} />
            </motion.div>
          </Tabs.Content>
        ))} */}
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
