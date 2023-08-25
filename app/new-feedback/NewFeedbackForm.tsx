"use client";
import React from "react";
import clsx from "clsx";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from ".@/components/FormTextArea";
import FormTextInput from ".@/components/FormTextInput";
import FormSelect from ".@/components/FormSelect";
import Button from ".@/components/Button";
import { CATEGORY_VALUES } from "../constants";
import { Category } from "@prisma/client";
import { createPostRequest } from "../../lib/mutations";
import { ImSpinner8 } from "react-icons/im";
import {
  CreateFeedbackFormSchema,
  CreateFeedbackFormData,
} from "../../lib/zod";

function NewFeedbackForm() {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFeedbackFormData>({
    resolver: zodResolver(CreateFeedbackFormSchema),
    defaultValues: {
      category: CATEGORY_VALUES[0],
    },
  });

  const [isFetching, setIsFetching] = React.useState(false);
  const router = useRouter();
  const { category } = getValues();

  async function onSubmit(data: CreateFeedbackFormData) {
    setIsFetching(true);
    try {
      const result = await createPostRequest(data);
      if (result.status === "success") {
        router.push("/");
      }
    } catch (e) {
    } finally {
      setIsFetching(false);
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("rounded-lg bg-white p-6 pt-11", "md:p-10 md:pt-14")}
    >
      <h1 className={clsx("mb-6 text-lg font-bold", "md:mb-10  md:text-2xl")}>
        Create New Feedback
      </h1>
      <div className="flex flex-col gap-6">
        <FormTextInput<"create">
          title="Feedback Title"
          subTitle="Add a short, descriptive headline"
          register={(field) => register(field)}
          field="title"
          error={errors.title?.message}
        />
        <FormSelect
          title="Category"
          subTitle="Choose a category for your feedback"
          options={CATEGORY_VALUES}
          currentValue={category}
          handleChange={(value: Category) => {
            setValue("category", value, { shouldValidate: true });
          }}
          error={errors.category?.message}
        />

        <FormTextArea<"create">
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          register={register}
          field="content"
          error={errors.content?.message}
        />
        {/* Rendering two different button containers one for mobile and one for tablet and up to not mess with tab order.  Previosly, was using flex-col-reverse, but this what cause tab issues.   */}
        <div className="mt-4 flex flex-col gap-4 text-brand-ghost_white md:hidden">
          <Button
            disabled={isFetching}
            className={clsx(
              "relative inline-flex items-center justify-center bg-brand-purple  outline-none ring-offset-2 transition-all focus:ring-2 focus:ring-blue-500",
              !isFetching && "hover:bg-purple-600",
              isFetching && "opacity-50"
            )}
          >
            <span className={isFetching ? "invisible" : undefined}>
              Add Feedback
            </span>
            {isFetching && (
              <ImSpinner8 className=" absolute h-4 w-4 animate-spin" />
            )}
          </Button>
          <Button
            type="button"
            disabled={isFetching}
            className={clsx(
              "bg-brand-blue_gray outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              !isFetching && " hover:bg-slate-600",
              isFetching && "opacity-50"
            )}
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
        </div>
        <div
          className={clsx(
            "mt-4 hidden gap-4 text-brand-ghost_white   md:flex md:justify-end"
          )}
        >
          <Button
            type="button"
            disabled={isFetching}
            className={clsx(
              "bg-brand-blue_gray outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              !isFetching && " hover:bg-slate-600",
              isFetching && "opacity-50"
            )}
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button
            disabled={isFetching}
            className={clsx(
              "relative inline-flex items-center justify-center bg-brand-purple  outline-none ring-offset-2 transition-all focus:ring-2 focus:ring-blue-500",
              !isFetching && "hover:bg-purple-600",
              isFetching && "opacity-50"
            )}
          >
            <span className={isFetching ? "invisible" : undefined}>
              Add Feedback
            </span>
            {isFetching && (
              <ImSpinner8 className=" absolute h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default NewFeedbackForm;
