import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { IoCheckmark } from "react-icons/io5";
import { SORT_OPTIONS } from "../constants";
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
      aria-label="Sort By "
    >
      {SORT_OPTIONS.map((val) => {
        return (
          <div key={val} className="flex items-center gap-3">
            <RadioGroup.Item
              className={clsx(
                "bg-white h-6 w-6 shadow-sm rounded-full",
                " hover:bg-purple-200",
                " focus:ring-1 focus:ring-purple-200"
              )}
              value={val}
              id={val}
            >
              <RadioGroup.Indicator className="relative bg-brand-purple flex h-full rounded-full  w-full items-center justify-center">
                <span className="absolute inline-block text-white  rounded-full">
                  <IoCheckmark size={16} />
                </span>
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <label className="Label" htmlFor={val}>
              {val}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
}

export default SortRadioGroup;
