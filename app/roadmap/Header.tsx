import clsx from "clsx";
import LinkWithChevronLeft from "../components/LinkWithChevronLeft";
import CustomLink from "../components/CustomLink";

function Header() {
  return (
    <header
      className={clsx(
        " bg-brand-american_blue text-brand-ghost_white py-7 pl-8 pr-10 flex items-center justify-between",
        "md:rounded-lg"
      )}
    >
      <div className="flex flex-col gap-1">
        <LinkWithChevronLeft className=" text-brand-ghost_white">
          Go Back
        </LinkWithChevronLeft>
        <h1 className="text-2xl font-bold">Roadmap</h1>
      </div>
      <CustomLink variant="primary" href="/new-feedback">
        + Add Feedback
      </CustomLink>
    </header>
  );
}
export default Header;
