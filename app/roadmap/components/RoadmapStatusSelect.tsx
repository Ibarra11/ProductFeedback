"use client";
import React from "react";
import Select from "../.@/components/Select";
import { Status } from ".prisma/client";
import { useRouter } from "next/navigation";
import { STATUS_VALUES } from "@/app/constants";
import { formatStatus } from "@/utils";

function RoadmapStatusSelect({ status }: { status: Status }) {
  const router = useRouter();
  function handleStatusChange(status: Status) {
    React.startTransition(() => {
      router.push(`/roadmap?status=${status.toLowerCase()}`);
    });
  }
  return (
    <Select
      options={STATUS_VALUES}
      selectText="Status: "
      currentValue={status}
      handleChange={handleStatusChange}
      ariaLabel="filter post by status"
      variant="roadmap"
    />
  );
}

export default RoadmapStatusSelect;
