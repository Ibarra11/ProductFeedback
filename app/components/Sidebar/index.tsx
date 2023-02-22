import clsx from "clsx";
import Banner from "./banner";
import FilterPills from "./filter_pills";
import Roadmap from "./roadmap";

function Sidebar() {
  return (
    <aside
      className={clsx(
        "flex gap-3",
        "lg:sticky lg:self-start lg:top-8 lg:flex-col lg:gap-6 lg:w-64"
      )}
    >
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <FilterPills />
      <Roadmap />
    </aside>
  );
}
export default Sidebar;
