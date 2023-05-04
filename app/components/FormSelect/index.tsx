import React from "react";
import Select from "../Select";
interface Props<T extends string> {
  title: string;
  subTitle: string;
  options: T[];
  value: T;
  handleValueChange: (newVal: T) => void;
}
function FormSelect<T extends string>({
  title,
  subTitle,
  options,
  value,
  handleValueChange,
}: Props<T>) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-4 ">
      <label
        htmlFor={id}
        className=" flex flex-col gap-0.5 text-brand-american_blue"
      >
        <span className="text-sm font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <Select
        currentValue={value}
        handleChange={handleValueChange}
        options={options}
        variant="form"
        ariaLabel={`choose a ${title}`}
      />
    </div>
  );
}

export default FormSelect;
