import Link from "next/link";
import clsx from "clsx";
import { ROADMAP_OPTIONS } from "@/app/constants";
import { formatStatus } from "@/app/utils";

function Roadmap() {
  return (
    <div
      className={clsx(
        "flex-1 flex flex-col gap-6 justify-between bg-white p-6 pt-4 rounded-lg",
        "lg:flex-initial"
      )}
    >
      <div className="flex justify-between items-center  ">
        <h2 className=" text-lg text-brand-american_blue font-bold">Roadmap</h2>
        <Link
          href="/roadmap"
          className="text-sm text-blue-400 self-end font-semibold transition-all duration-200 hover:underline"
        >
          View
        </Link>
      </div>
      <ul className="flex flex-col gap-2 text-brand-blue_gray">
        {ROADMAP_OPTIONS.map(({ status, count, color }, index) => (
          <li
            key={`${status}-${index}`}
            aria-label={status}
            className="flex gap-4 justify-between"
          >
            <div className="flex items-center gap-4 ">
              <span
                className={`inline-block w-2 h-2 ${color} rounded-full `}
              ></span>
              <span className="text-base">{formatStatus(status)}</span>
            </div>
            <span className="text-base font-bold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Roadmap;
