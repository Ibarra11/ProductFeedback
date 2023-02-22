import LinkWithChevronLeft from "../components/LinkWithChevronLeft";
import Button from "../components/Button";
function Header() {
  return (
    <header className=" bg-brand-american_blue text-brand-ghost_white py-7 pl-8 pr-10 flex items-center justify-between rounded-lg">
      <div className="flex flex-col gap-1">
        <LinkWithChevronLeft className=" text-brand-ghost_white" href="/">
          Go Back
        </LinkWithChevronLeft>
        <h1 className="text-2xl font-bold">Roadmap</h1>
      </div>
      <Button className=" bg-brand-purple text-brand-ghost_white">
        + Add Feedback
      </Button>
    </header>
  );
}
export default Header;
