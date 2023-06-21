"use client";
import React from "react";
import clsx from "clsx";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from "../components/FormTextArea";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";
import { User } from "@/types";
import { CATEGORY_VALUES } from "../constants";
import { Category } from "@prisma/client";
import { createPostRequest } from "../lib/mutations";
import { redirect } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";

const feedbackFormSchema = z.object({
  title: z.string(),
  category: z.nativeEnum(Category),
  content: z.string(),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
export type Register = UseFormRegister<FeedbackFormData>;
export type FeedbackFormFields = keyof FeedbackFormData;

function NewFeedbackForm() {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      category: CATEGORY_VALUES[0],
    },
  });

  const [isFetching, setIsFetching] = React.useState(false);
  const router = useRouter();
  const { category } = getValues();

  async function onSubmit(data: FeedbackFormData) {
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
        <FormTextInput
          title="Feedback Title"
          subTitle="Add a short, descriptive headline"
          register={register}
          field="title"
        />
        <FormSelect
          title="Category"
          subTitle="Choose a category for your feedback"
          options={CATEGORY_VALUES}
          currentValue={category}
          handleChange={(value: Category) => setValue("category", value)}
        />
        <FormTextArea
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          register={register}
          field="content"
        />
        <div
          className={clsx(
            "mt-4  flex flex-col-reverse gap-4 text-brand-ghost_white",
            "md:flex-row md:justify-end"
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
