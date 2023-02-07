import Banner from "./banner";
import FilterPills from "./filter_pills";
function Sidebar() {
  return (
    <div className="w-64 flex flex-col gap-6">
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <FilterPills />
    </div>
  );
}
export default Sidebar;