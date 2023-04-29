import { Status, User } from "@prisma/client";
import RoadmapTabs from "./RoadmapTabs";
interface Props {
  user: User;
  status: Status;
}
function RoadmapView({ user, status }: Props) {
  return (
    <div className="h-full hidden md:block">
      <RoadmapTabs status={status}></RoadmapTabs>
    </div>
  );
}

export default RoadmapView;
