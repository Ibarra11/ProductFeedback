import clsx from "clsx";
import Banner from "../Banner";
import Roadmap from "./roadmap";
import { Suspense } from "react";
import RoadmapSkeleton from "./RoadmapSkeleton";
import RoadmapList from "./RoadmapList";
import SidebarCategoryPills from "./SidebarCategoryPills";
import { PostsPromise, User } from "@/types";
import UserProfile from "@/components/UserProfile";

function Sidebar({
  postsPromise,
  user,
}: {
  postsPromise: PostsPromise;
  user: User;
}) {
  return (
    <aside
      className={clsx(
        "relative hidden",
        "md:block",
        "lg:sticky lg:top-4  lg:w-64   lg:flex-col lg:gap-6 lg:self-start"
      )}
    >
      {/* Desktop View */}
      <div className="hidden lg:flex lg:flex-col lg:gap-3">
        <Banner title="Frontend Mentor" subTitle="Feedback Board" />
        <UserProfile user={user} />
        <SidebarCategoryPills />
        <Roadmap>
          <Suspense fallback={<RoadmapSkeleton />}>
            <RoadmapList postsPromise={postsPromise} />
          </Suspense>
        </Roadmap>
      </div>
      {/* tablet view */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
        <Banner title="Frontend Mentor" subTitle="Feedback Board" />
        <UserProfile user={user} />
        <SidebarCategoryPills />
        <Roadmap>
          <Suspense fallback={<RoadmapSkeleton />}>
            <RoadmapList postsPromise={postsPromise} />
          </Suspense>
        </Roadmap>
      </div>
    </aside>
  );
}
export default Sidebar;
