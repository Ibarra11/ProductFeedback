import { Post } from "@/app/lib/prisma/post";
import clsx from "clsx";
import Banner from "../Banner";
import FilterPills from "./filter_pills";
import Roadmap from "./roadmap";
import RoadmapList from "./RoadmapList";
import MobileHeader from "../MobileHeader";
function Sidebar({ posts }: { posts: Post[] }) {
  return (
    <>
      <aside
        className={clsx(
          "hidden",
          "md:flex md:gap-3",
          "lg:sticky lg:self-start lg:top-8 lg:flex-col lg:gap-6 lg:w-64"
        )}
      >
        <Banner title="Frontend Mentor" subTitle="Feedback Board" />
        <FilterPills />
        {/* @ts-expect-error Async Server Component */}
        <Roadmap>
          <RoadmapList posts={posts} />
        </Roadmap>
      </aside>
      <MobileHeader />
    </>
  );
}
export default Sidebar;
