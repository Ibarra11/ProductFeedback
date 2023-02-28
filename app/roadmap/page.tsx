import Header from "./Header";
import RoadmapRequestList from "./RoadmapRequestList";
import RoadmapTabs from "./RoadmapTabs";
import { Post } from "@/types";
import data from "data.json";
import clsx from "clsx";
function Page() {
  const planned = data.productRequests.filter(
    (product) => product.status === "planned"
  ) as Post[];
  const inProgress = data.productRequests.filter(
    (product) => product.status === "in-progress"
  ) as Post[];
  const live = data.productRequests.filter(
    (product) => product.status === "live"
  ) as Post[];
  return (
    <div
      className={clsx("max-w-5xl w-full mx-auto flex flex-col", "md:gap-12")}
    >
      <Header />
      <div className="flex-1 h-full ">
        {/* tablet to desktop view */}
        <div className={clsx("hidden", "md:flex md:gap-7")}>
          <RoadmapRequestList status="planned" feedbackRequestList={planned} />
          <RoadmapRequestList
            status="in-progress"
            feedbackRequestList={inProgress}
          />
          <RoadmapRequestList status="live" feedbackRequestList={live} />
        </div>
        {/* mobile view */}
        <div className={clsx("h-full", "md:hidden")}>
          <RoadmapTabs tabs={{ planned, "in-progress": inProgress, live }} />
        </div>
      </div>
    </div>
  );
}

export default Page;
