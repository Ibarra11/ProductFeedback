"use client";
import React from "react";
import Select from "../components/Select";
import { Status } from ".prisma/client";
import { useRouter } from "next/navigation";
function reformatStatus(status: string) {
  return status === "In-Progress" ? "In_Progress" : status;
}
const statusOptions = Object.values(Status).map((status) =>
  status === "In_Progress" ? status.replace("_", "-") : status
) as Status[];
function RoadmapStatusSelect({ status }: { status: Status }) {
  const router = useRouter();
  function handleStatusChange(status: Status) {
    React.startTransition(() => {
      router.push(
        // @ts-ignore
        `/roadmap?status=${reformatStatus(status)}`
      );
    });
  }

  return (
    <Select
      options={statusOptions}
      selectText="Status: "
      currentValue={status}
      arrowColor="american_blue"
      handleChange={handleStatusChange}
    />
  );
}

export default RoadmapStatusSelect;
