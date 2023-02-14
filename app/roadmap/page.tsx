import Header from "./Header";

import RoadmapRequestList from "./RoadmapRequestList";
import { Post } from "@/types";
import data from "data.json";
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
  console.log(planned);
  return (
    <div className=" max-w-5xl w-full mx-auto flex flex-col gap-12">
      <Header />
      <div className="flex-1 flex gap-7">
        <RoadmapRequestList status="planned" feedbackRequestList={planned} />
        <RoadmapRequestList
          status="in-progress"
          feedbackRequestList={inProgress}
        />
        <RoadmapRequestList status="live" feedbackRequestList={live} />
      </div>
    </div>
  );
}

export default Page;
