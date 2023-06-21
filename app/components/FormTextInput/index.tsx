import React from "react";
import clsx from "clsx";
import {
  FeedbackFormFields,
  Register,
} from "@/app/new-feedback/NewFeedbackForm";

type Props = {
  title: string;
  subTitle: string;
  register: Register;
  field: FeedbackFormFields;
};
function FormTextInput({ title, subTitle, register, field }: Props) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor={id}
        className=" flex flex-col gap-0.5  text-brand-american_blue"
      >
        <span className="text-base font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <input
        className={clsx(
          "rounded-md bg-brand-alice_blue px-6 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500"
        )}
        id={id}
        type="text"
        {...register(field)}
      />
    </div>
  );
}

export default FormTextInput;
