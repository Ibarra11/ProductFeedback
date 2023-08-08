import React from "react";
import { Status } from "@prisma/client";
import RoadmapPostList from "./RoadmapPostList";
import RoadmapTabs from "./RoadmapTabs";
import { Roadmap_Post } from "../page";
import RoadmapLoading from "@/loading";
interface Props {
  // postsPromise: Promise<Roadmap_Post[]>;
  status: Status;
}

async function RoadmapView({ status }: Props) {
  return (
    <div className="h-full hidden md:block">
      <RoadmapTabs status={status}>
        <React.Suspense fallback={<RoadmapLoading />}>
          <RoadmapPostList status={status} />
        </React.Suspense>
      </RoadmapTabs>
    </div>
  );
}

export default RoadmapView;
