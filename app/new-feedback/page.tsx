"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import LinkWithChevronLeft from "../components/LinkWithChevronLeft";
import FormTextArea from "../components/FormTextArea";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";
import { FormData } from "@/types";
import { FEEDBACK_CATEGORIES } from "../constants";

function Page() {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    category: FEEDBACK_CATEGORIES[0],
    content: "",
  });

  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const res = await fetch("/new-feedback/api", {
      method: "POST",
      body: JSON.stringify({ ...formData, user_id: 71 }),
    });
    if (!res.ok) {
      const errors = await res.json();
      return;
    }
    setFormData({
      title: "",
      category: FEEDBACK_CATEGORIES[0],
      content: "",
    });
  }

  return (
    <>
      <LinkWithChevronLeft className="mb-10">Go Back</LinkWithChevronLeft>
      <div className={clsx("relative  pt-5", "md:pt-7")}>
        <Image
          src="/shared/icon-new-feedback.svg"
          className={clsx("absolute top-0 left-6", "md:hidden")}
          width={40}
          height={40}
          alt=""
          aria-hidden
        />
        <Image
          src="/shared/icon-new-feedback.svg"
          className={clsx("hidden top-0 left-10", "md:block md:absolute")}
          width={56}
          height={56}
          alt=""
          aria-hidden
        />
        <form
          onSubmit={handleFormSubmit}
          className={clsx("bg-white p-6 pt-11 rounded-lg", "md:p-10 md:pt-14")}
        >
          <h1
            className={clsx("text-lg font-bold mb-6", "md:mb-10  md:text-2xl")}
          >
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
              handleValueChange={(content) =>
                setFormData({ ...formData, content })
              }
            />
            <div
              className={clsx(
                "flex  flex-col-reverse gap-4 text-brand-ghost_white mt-4",
                "md:flex-row md:justify-end"
              )}
            >
              <Button className={clsx(" bg-brand-blue_gray")}>Cancel</Button>
              <Button type="submit" className="bg-brand-purple">
                Add Feedback
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;
