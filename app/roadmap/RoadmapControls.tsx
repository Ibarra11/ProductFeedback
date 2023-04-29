"use client";

import { Status } from "@prisma/client";
import React from "react";
import RoadmapStatusSelect from "./RoadmapStatusSelect";
import SortAndFilterButton from "./SortAndFilterButton";
import SortAndFilterModal from "./SortAndFIlterModal";

function RoadmapControls({ status }: { status: Status }) {
  const [isOpen, setIsOpen] = React.useState(false);
  function handleOpenChange() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="flex justify-between  mb-4">
      <RoadmapStatusSelect status={status} />
      <SortAndFilterButton onClick={handleOpenChange} />

      <SortAndFilterModal isOpen={isOpen} handleOpenChange={handleOpenChange} />
    </div>
  );
}

export default RoadmapControls;
