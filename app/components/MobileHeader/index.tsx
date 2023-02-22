import Banner from "../Banner";
import { Menu } from "react-feather";
import clsx from "clsx";
function MobileHeader() {
  return (
    <header className={clsx("relative", "md:hidden")}>
      <Banner title="Frontend Mentor" subTitle="Feedback Board" />
      <button className="absolute top-1/2 right-6 -translate-y-1/2 text-brand-ghost_white">
        <Menu size={24} strokeWidth={2} />
        <span className="sr-only">Open nav</span>
      </button>
    </header>
  );
}

export default MobileHeader;
