import clsx from "clsx";
import Banner from "../Banner";
import Roadmap from "./roadmap";
import { Category, Status } from "@prisma/client";
import { Suspense } from "react";
import RoadmapSkeleton from "./RoadmapSkeleton";
import RoadmapList from "./RoadmapList";
import SidebarCategoryPills from "./SidebarCategoryPills";
import { PostsPromise } from "@/types";

function Sidebar({ postsPromise }: { postsPromise: PostsPromise }) {
  return (
    <aside
      className={clsx(
        "hidden relative",
        "md:flex md:gap-3",
        "lg:self-start lg:sticky  lg:top-4   lg:flex-col lg:gap-6 lg:w-64"
      )}
    >
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <SidebarCategoryPills />
      <Roadmap>
        <Suspense fallback={<RoadmapSkeleton />}>
          <RoadmapList postsPromise={postsPromise} />
        </Suspense>
      </Roadmap>
    </aside>
  );
}
export default Sidebar;
