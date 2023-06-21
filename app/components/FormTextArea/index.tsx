import React from "react";
import {
  Register,
  FeedbackFormFields,
} from "@/app/new-feedback/NewFeedbackForm";
import FormFieldError from "../FormFieldError";

function FormTextArea({
  title,
  subTitle,
  register,
  field,
  error,
}: {
  title: string;
  subTitle: string;
  register: Register;
  field: FeedbackFormFields;
  error?: string;
}) {
  const id = React.useId();
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className=" mb-4 flex flex-col  gap-0.5 text-brand-american_blue"
      >
        <span className="text-base font-bold">{title}</span>
        <span className="text-sm font-light">{subTitle}</span>
      </label>
      <textarea
        {...register(field)}
        className={`mb-1 h-20 resize-none overflow-y-auto rounded-md bg-brand-alice_blue px-6`}
      />
      {error && <FormFieldError>{error}</FormFieldError>}
    </div>
  );
}

export default FormTextArea;
