import React from "react";
import TextArea from "../TextArea";
function FormTextArea({
  title,
  subTitle,

  value,
  handleValueChange,
}: {
  title: string;
  subTitle: string;

  value: string;
  handleValueChange: (nextVal: string) => void;
}) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-4 ">
      <label
        htmlFor={id}
        className=" flex flex-col gap-0.5  text-brand-american_blue"
      >
        <span className="text-sm font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <TextArea
        id={id}
        onChange={(e) => handleValueChange(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default FormTextArea;
