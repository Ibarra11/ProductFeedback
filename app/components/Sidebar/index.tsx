import clsx from "clsx";
import Banner from "../Banner";
import Roadmap from "./roadmap";
import MobileHeader from "../MobileHeader";
import { Category, Status } from "@prisma/client";
import { Suspense } from "react";
import RoadmapSkeleton from "./RoadmapSkeleton";
import RoadmapList from "./RoadmapList";
import SidebarCategoryPills from "./SidebarCategoryPills";
interface Props {
  postsPromise: Promise<
    {
      createdAt: string;
      post_id: number;
      title: string;
      content: string;
      category: Category;
      status: Status;
      user_fk_id: number;
      _count: {
        comments: number;
        upvotes: number;
      };
    }[]
  >;
}
function Sidebar({ postsPromise }: Props) {
  return (
    <>
      <aside
        className={clsx(
          "hidden relative",
          "md:flex md:gap-3",
          "lg:self-start lg:sticky  lg:-top-4   lg:flex-col lg:gap-6 lg:w-64"
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
      {/* <MobileHeader>
        <Roadmap>
          <Suspense fallback={<RoadmapSkeleton />}>
            <RoadmapList postsPromise={postsPromise} />
          </Suspense>
        </Roadmap>
      </MobileHeader> */}
    </>
  );
}
export default Sidebar;
