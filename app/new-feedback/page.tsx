"use client";
import React from "react";
import Image from "next/image";
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
    detail: "",
  } as FormData);

  return (
    <article className="max-w-xl w-full mx-auto ">
      <LinkWithChevronLeft className="mb-10" href="/">
        Go Back
      </LinkWithChevronLeft>
      <form className="bg-white px-10 pb-9 rounded-lg">
        <Image
          src="/shared/icon-new-feedback.svg"
          className="mb-2 -translate-y-1/2"
          width={56}
          height={56}
          alt=""
          aria-hidden
        />
        <h1 className="text-2xl font-bold mb-10">Create New Feedback</h1>
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
            value={formData.detail}
            handleValueChange={(newDetail) =>
              setFormData({ ...formData, detail: newDetail })
            }
          />
          <div className="flex gap-4 justify-end text-brand-ghost_white">
            <Button className=" bg-brand-blue_gray">Cancel</Button>
            <Button className="bg-brand-purple">Add Feedback</Button>
          </div>
        </div>
      </form>
    </article>
  );
}

export default Page;
