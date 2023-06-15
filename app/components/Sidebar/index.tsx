import clsx from "clsx";
import Banner from "../Banner";
import Roadmap from "./roadmap";
import { Category, Status } from "@prisma/client";
import { Suspense } from "react";
import RoadmapSkeleton from "./RoadmapSkeleton";
import RoadmapList from "./RoadmapList";
import SidebarCategoryPills from "./SidebarCategoryPills";
import { PostsPromise, User } from "@/types";
import UserProfile from "../UserProfile";

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
        "md:flex md:gap-3",
        "lg:sticky lg:top-4  lg:w-64   lg:flex-col lg:gap-6 lg:self-start"
      )}
    >
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <UserProfile user={user} />
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
