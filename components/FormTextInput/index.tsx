import React from "react";
import clsx from "clsx";

import FormFieldError from "../FormFieldError";
import { CreateFeedbackFormFields, EditFeedbackFormFields } from "@/lib/zod";
import { UseFormRegisterReturn } from "react-hook-form";

type Props<T extends "edit" | "create"> = {
  title: string;
  subTitle: string;
  field: T extends "edit" ? EditFeedbackFormFields : CreateFeedbackFormFields;
  error?: string;
  register: (
    field: T extends "edit" ? EditFeedbackFormFields : CreateFeedbackFormFields
  ) => UseFormRegisterReturn;
};
function FormTextInput<T extends "edit" | "create">({
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
      <input
        className={clsx(
          "mb-1 rounded-md bg-brand-alice_blue px-6 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500",
          error && "border-2 border-red-600"
        )}
        id={id}
        type="text"
        {...register(field)}
      />
      {error && <FormFieldError>{error}</FormFieldError>}
    </div>
  );
}

export default FormTextInput;
