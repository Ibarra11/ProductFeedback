"use client";
import React from "react";
import Select from "../../components/Select";
import { Status } from ".prisma/client";
import { useRouter } from "next/navigation";

function reformatStatus(status: Status) {
  if (status === "In_Progress") {
    return status.toLowerCase().replace("_", "-");
  }
  return status.toLowerCase();
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
      handleChange={handleStatusChange}
      ariaLabel="filter post by status"
      variant="roadmap"
    />
  );
}

export default RoadmapStatusSelect;