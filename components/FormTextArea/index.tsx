import React from "react";

import FormFieldError from "../FormFieldError";
import { CreateFeedbackFormFields, EditFeedbackFormFields } from "@/lib/zod";
import { UseFormRegisterReturn } from "react-hook-form";

type Props<T extends "edit" | "create"> = {
  title: string;
  subTitle: string;
  register: (
    field: T extends "edit" ? EditFeedbackFormFields : CreateFeedbackFormFields
  ) => UseFormRegisterReturn;
  field: T extends "edit" ? EditFeedbackFormFields : CreateFeedbackFormFields;
  error?: string;
};

function FormTextArea<T extends "edit" | "create">({
  title,
  subTitle,
  register,
  field,
  error,
}: Props<T>) {
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
