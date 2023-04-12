import clsx from "clsx";
import Banner from "../Banner";
import FilterPills from "./filter_pills";
import Roadmap from "./roadmap";

function Sidebar({ children }: React.PropsWithChildren<{}>) {
  return (
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
      <Roadmap>{children}</Roadmap>
    </aside>
  );
}
export default Sidebar;
