import React from "react";
import Select from "../Select";
import FormFieldError from "../FormFieldError";

interface Props<T extends string> {
  title: string;
  subTitle: string;
  options: T[];
  currentValue: T;
  handleChange: (value: T) => void;
  error?: string;
}
function FormSelect<T extends string>({
  title,
  subTitle,
  options,
  currentValue,
  handleChange,
  error,
}: Props<T>) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-4 ">
      <label
        htmlFor={id}
        className=" flex flex-col gap-0.5 text-brand-american_blue"
      >
        <span className="text-base font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <Select
        id={id}
        currentValue={currentValue}
        handleChange={handleChange}
        options={options}
        variant="form"
        ariaLabel={`choose a ${title}`}
      />
      {error && <FormFieldError>{error}</FormFieldError>}
    </div>
  );
}

export default FormSelect;
