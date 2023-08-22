import React from "react";
import { Status } from "@prisma/client";
import RoadmapPostList from "./RoadmapPostList";
import RoadmapLoading from "./RoadmapLoading";
import RoadmapControls from "./RoadmapControls";
interface Props {
  status: Status;
}
function MobileRoadmapView({ status }: Props) {
  return (
    <div className="relative pt-4 pb-6 px-4 h-full md:hidden">
      <RoadmapControls status={status} />
      <React.Suspense fallback={<RoadmapLoading />}>
        <RoadmapPostList status={status} />
      </React.Suspense>
    </div>
  );
}

export default MobileRoadmapView;
