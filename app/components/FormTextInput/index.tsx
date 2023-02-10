import React from "react";
import clsx from "clsx";
interface Props {
  title: string;
  subTitle: string;
  value: string;
  handleValueChange: (newVal: string) => void;
}
function FormTextInput({ title, subTitle, handleValueChange }: Props) {
  const id = React.useId();
  return (
    <div className="  flex flex-col gap-4">
      <label
        htmlFor={id}
        className=" flex flex-col gap-0.5  text-brand-american_blue"
      >
        <span className="text-sm font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <input
        className={clsx(
          "bg-brand-alice_blue px-6 py-3 text-base rounded-md border-none"
        )}
        id={id}
        type="text"
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </div>
  );
}

export default FormTextInput;
