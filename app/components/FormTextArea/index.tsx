import React from "react";
import TextArea from "../TextArea";

import {
  Register,
  FeedbackFormFields,
} from "@/app/new-feedback/NewFeedbackForm";

function FormTextArea({
  title,
  subTitle,
  register,
  field,
}: {
  title: string;
  subTitle: string;
  register: Register;
  field: FeedbackFormFields;
}) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-4 ">
      <label
        htmlFor={id}
        className=" flex flex-col gap-0.5  text-brand-american_blue"
      >
        <span className="text-base font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <textarea
        {...register(field)}
        className={`h-20 resize-none overflow-y-auto rounded-md bg-brand-alice_blue px-6`}
      />
    </div>
  );
}

export default FormTextArea;
