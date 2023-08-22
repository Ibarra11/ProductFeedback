"use client";
import { Status } from "@prisma/client";
import React from "react";
import RoadmapStatusSelect from "./RoadmapStatusSelect";

function RoadmapControls({ status }: { status: Status }) {
  const [isOpen, setIsOpen] = React.useState(false);
  function handleOpenChange() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex justify-between  mb-4">
      <RoadmapStatusSelect status={status} />
    </div>
  );
}

export default RoadmapControls;
