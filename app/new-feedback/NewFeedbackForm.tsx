"use client";
import React from "react";
import clsx from "clsx";
import FormTextArea from "../components/FormTextArea";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";
import { User } from "@prisma/client";
import { FormData } from "@/types";
import { FEEDBACK_CATEGORIES } from "../constants";
import { useRouter } from "next/navigation";
import LoadingCircle from "../components/LoadingCircle";
type FormState = "idle" | "submitting" | "error";
function NewFeedbackForm({ user }: { user: User }) {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    category: FEEDBACK_CATEGORIES[0],
    content: "",
  });
  const [formState, setFormState] = React.useState<FormState>("idle");
  const router = useRouter();
  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormState("submitting");
    const res = await fetch("/new-feedback/api", {
      method: "POST",
      body: JSON.stringify({ ...formData, user_fk_id: user.user_id }),
    });
    if (!res.ok) {
      const errors = await res.json();
      setFormState("error");
      return;
    } else {
      setFormState("idle");
      setFormData({
        title: "",
        category: FEEDBACK_CATEGORIES[0],
        content: "",
      });
      router.push("/");
    }
  }

  const isFormCompleted =
    formData.content.trim() !== "" && formData.title.trim() !== "";
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
          options={FEEDBACK_CATEGORIES}
          value={formData.category}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, category: newVal })
          }
        />
        <FormTextArea
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          value={formData.content}
          handleValueChange={(content) => setFormData({ ...formData, content })}
        />
        <div
          className={clsx(
            "flex  flex-col-reverse gap-4 text-brand-ghost_white mt-4",
            "md:flex-row md:justify-end"
          )}
        >
          <Button
            disabled={formState === "submitting"}
            className={clsx(
              "bg-brand-blue_gray transition-all",
              " hover:bg-slate-600",
              formState === "submitting" && "opacity-75"
            )}
          >
            Cancel
          </Button>
          <Button
            disabled={formState === "submitting" || !isFormCompleted}
            type="submit"
            className={clsx(
              "relative bg-brand-purple  transition-all",
              formState !== "submitting" && "hover:bg-purple-600"
            )}
          >
            {formState !== "submitting" && "Add Feedback"}
            {formState === "submitting" && (
              <>
                <span className=" invisible">Add Feedback</span>
                {
                  <span className="absolute z-20 inline-flex justify-center items-center left-0 top-0 w-full h-full">
                    <LoadingCircle svgStyles="w-8 h-8 text-white" />
                  </span>
                }
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default NewFeedbackForm;
