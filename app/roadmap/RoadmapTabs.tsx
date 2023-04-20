"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Status } from "@prisma/client";
import Select from "../components/Select";
import clsx from "clsx";
import { BiFilter } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface Props {
  status: Status;
}

// import * as Select from "@radix-ui/react-select";
import { formatStatus } from "../utils";

function RoadmapTabs({ children, status }: React.PropsWithChildren<Props>) {
  const router = useRouter();

  return (
    <Tabs.Root
      className="relative  h-full pt-4 md:p-0 flex flex-col gap-6"
      data-id="root"
      value={status}
      onValueChange={(val) => {
        router.push(`/roadmap?status=${val}`);
      }}
    >
      <TabsList status={status} />

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

function MobileTabsList({ status }: { status: Status }) {
  return (
    <Select
      options={[
        "Planned",
        "Most Upvotes",
        "Least Upvotes",
        "Most Comments",
        "Least Comments",
      ]}
      selectText="Sort by:"
      className="text-brand-ghost_white"
      arrowColor="ghost_white"
    />
    // <div className={clsx("absolute top-4 right-4", "md:hidden")}>
    //   <Select.Root>
    //     <Select.Trigger className="flex p-3 rounded-md items-center bg-white shadow-md  gap-3  ">
    //       <Select.Value className="text-xs">
    //         {formatStatus(status)}
    //       </Select.Value>
    //       <Select.Icon className=" text-2xl text-brand-american_blue">
    //         <BiFilter />
    //       </Select.Icon>
    //     </Select.Trigger>

    //     <Select.Portal className=" w-44 bg-red-500 h-24">
    //       <Select.Content
    //         position="popper"
    //         className="shadow-md p-2  bg-red-500"
    //       >
    //         {/* <Select.ScrollUpButton /> */}
    //         <h1>hello</h1>
    //         <Select.Viewport className="p-3 bg-red-500 ">
    //           <h1>Hello </h1>

    //           <Select.Group>
    //             <Select.Label>Status</Select.Label>
    //             <Select.Item
    //               className=" relative text-xs text-brand-american_blue h-6 flex items-center pr-8 pl-6"
    //               value="planned"
    //             >
    //               Planned
    //             </Select.Item>
    //             <Select.Item
    //               className=" relative text-xs text-brand-american_blue h-6 flex items-center pr-8 pl-6"
    //               value="live"
    //             >
    //               Live
    //             </Select.Item>
    //             <Select.Item
    //               className=" relative text-xs text-brand-american_blue h-6 flex items-center pr-8 pl-6"
    //               value="in_progress"
    //             >
    //               In-Progress
    //             </Select.Item>
    //             <Select.Item
    //               className="relative text-xs text-brand-american_blue h-6 flex items-center pr-8 pl-6"
    //               value="suggestion"
    //             >
    //               Suggestion
    //             </Select.Item>
    //           </Select.Group>

    //           <Select.Separator />
    //         </Select.Viewport>
    //         <Select.ScrollDownButton />
    //         <Select.Arrow />
    //       </Select.Content>
    //     </Select.Portal>
    //   </Select.Root>
    // </div>
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
  );
}
export default RoadmapTabs;
