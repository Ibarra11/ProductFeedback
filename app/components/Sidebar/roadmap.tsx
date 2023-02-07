import { ROADMAP_OPTIONS } from "@/constants";
type Option = {
  type: "Planned" | "Live" | "In-Progress";
  count: number;
};

const OptionMap = {
  Planned: "tangerine",
  Live: "purple",
  "In-Progress": "maya_blue",
};
interface Props {
  options: Option[];
}
function Roadmap({ options }: Props) {
  return (
    <div className="flex flex-col gap-6 justify-between bg-white p-6 pt-4 rounded-lg">
      <div className="flex justify-between items-center  ">
        <h2 className=" text-lg text-brand-american_blue font-bold">Roadmap</h2>
        <button className="text-sm text-blue-400 self-end font-semibold transition-all duration-200 hover:underline">
          View
        </button>
      </div>
      <ul className="flex flex-col gap-2 text-brand-blue_gray">
        {options.map(({ type, count }, index) => (
          <li
            key={`${type}-${index}`}
            aria-label={type}
            className="flex gap-4 justify-between"
          >
            <div className="flex items-center gap-4 ">
              <span
                className={`inline-block bg-brand-${OptionMap[type]} rounded-full w-2 h-2`}
              ></span>
              <span className="text-base">{type}</span>
            </div>
            <span className="text-base font-bold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Roadmap;
