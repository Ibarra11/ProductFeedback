import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { AiOutlineCheck } from "react-icons/ai";
import { SORT_OPTIONS } from "../../constants";
import { SortByTypes } from "@/types";
function SortRadioGroup({
  value,
  onChange,
}: {
  value: SortByTypes;
  onChange: (val: SortByTypes) => void;
}) {
  return (
    <RadioGroup.Root
      className=" space-y-2"
      defaultValue={value}
      value={value}
      onValueChange={(val) => onChange(val as SortByTypes)}
      aria-label="Sort By"
    >
      {SORT_OPTIONS.map((val) => {
        return (
          <div
            key={val}
            className="group flex items-center rounded py-1.5 px-2 transition-colors duration-200 hover:bg-brand-purple hover:text-brand-ghost_white"
          >
            <label className="flex-1" htmlFor={val}>
              {val}
            </label>
            <RadioGroup.Item
              className={clsx(
                "relative ml-auto bg-slate-900   h-6 w-6 shadow-sm rounded-full",
                "group-hover:bg-purple-300"
              )}
              value={val}
              id={val}
            >
              <RadioGroup.Indicator className="relative transition-colors duration-200 group-hover:bg-brand-ghost_white  bg-brand-purple flex h-full rounded-full  w-full items-center justify-center">
                <span className="absolute inline-block text-white  rounded-full">
                  <AiOutlineCheck
                    className="group-hover:text-brand-purple
                  text-brand-ghost_white h-4 w-4 transition-colors duration-200"
                  />
                </span>
              </RadioGroup.Indicator>
            </RadioGroup.Item>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}

export default SortRadioGroup;
