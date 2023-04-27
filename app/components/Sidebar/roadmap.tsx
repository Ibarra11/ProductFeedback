import Link from "next/link";
import clsx from "clsx";

function Roadmap({ children }: React.PropsWithChildren) {
  return (
    <div
      className={clsx(
        "md:flex-1 flex flex-col gap-4 bg-white p-6 pt-4 rounded-lg",
        "lg:flex-initial lg:gap-6"
      )}
    >
      <div className="flex justify-between items-center  ">
        <h2 className=" text-lg text-brand-american_blue font-bold">Roadmap</h2>
        <Link
          href="/roadmap?status=Suggestion"
          className="text-sm text-blue-400 self-end font-semibold transition-all duration-200 hover:underline"
        >
          View
        </Link>
      </div>
      {children}
    </div>
  );
}

export default Roadmap;
