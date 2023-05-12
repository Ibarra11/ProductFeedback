"use client";

import { Status } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        {isOpen && (
          <SortAndFilterModal
            isOpen={isOpen}
            handleOpenChange={handleOpenChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default RoadmapControls;
