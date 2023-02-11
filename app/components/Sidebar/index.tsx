import Banner from "./banner";
import FilterPills from "./filter_pills";
import Roadmap from "./roadmap";

function Sidebar() {
  return (
    <aside className="w-64 flex flex-col gap-6">
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <FilterPills />
      <Roadmap />
    </aside>
  );
}
export default Sidebar;
