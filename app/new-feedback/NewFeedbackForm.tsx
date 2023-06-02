"use client";
import React from "react";
import clsx from "clsx";
import { z } from "zod";
import FormTextArea from "../components/FormTextArea";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";
import { User } from "@prisma/client";
import { FormData } from "@/types";
import { CATEGORY_VALUES } from "../constants";
import { useRouter } from "next/navigation";
import LoadingCircle from "../components/LoadingCircle";
import useFormState from "../lib/hooks/useFormState";
function NewFeedbackForm({ user }: { user: User }) {
  const { formData, setFormData, status, handleFormSubmit } = useFormState({
    formValues: {
      title: "",
      category: "",
      content: "",
    },
    validation: z.object({
      title: z.string().min(1),
      category: z.string().min(1),
      content: z.string().min(1),
    }),
    fetchConfig: {
      url: "/api/post/",
      data: { user_fk_id: user.user_id },
      onSuccessRedirect: "/",
    },
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      className={clsx("bg-white p-6 pt-11 rounded-lg", "md:p-10 md:pt-14")}
    >
      <h1 className={clsx("text-lg font-bold mb-6", "md:mb-10  md:text-2xl")}>
        Create New Feedback
      </h1>
      <div className="flex flex-col gap-6">
        <FormTextInput
          title="Feedback Title"
          subTitle="Add a short, descriptive headline"
          value={formData.title}
          handleValueChange={(newTitle) =>
            setFormData({ ...formData, title: newTitle })
          }
        />
        <FormSelect
          title="Category"
          subTitle="Choose a category for your feedback"
          options={CATEGORY_VALUES}
          value={formData.category}
          handleValueChange={(newVal) => setFormData({ category: newVal })}
        />
        <FormTextArea
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          value={formData.content}
          handleValueChange={(content) => setFormData({ content })}
        />
        <div
          className={clsx(
            "flex  flex-col-reverse gap-4 text-brand-ghost_white mt-4",
            "md:flex-row md:justify-end"
          )}
        >
          <Button
            disabled={status === "pending"}
            className={clsx(
              "bg-brand-blue_gray transition-all",
              " hover:bg-slate-600",
              status === "pending" && "opacity-75"
            )}
          >
            Cancel
          </Button>
          <Button
            disabled={status === "pending"}
            type="submit"
            className={clsx(
              "relative bg-brand-purple  transition-all",
              status !== "pending" && "hover:bg-purple-600"
            )}
          >
            <span className={`${status === "pending" ? "invisible" : ""}`}>
              Add Feedback
            </span>
            {status === "pending" && (
              <LoadingCircle size="md" color="primary" />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default NewFeedbackForm;
