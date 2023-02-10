"use client";
import React from "react";
import Image from "next/image";
import FormSelect from "../../components/FormSelect";
import FormTextArea from "../../components/FormTextArea";
import FormTextInput from "../../components/FormTextInput";
import Button from "@/app/components/Button";
import { FEEDBACK_STATUS, FEEDBACK_CATEGORIES } from "@/app/constants";
import data from "data.json";
import { EditFormData } from "@/types";
import { useRouter } from "next/navigation";

function EditFeedback({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const productFeedback = data.productRequests.find(
    (product) => product.id === +id
  );
  if (!productFeedback) {
    throw new Error("");
  }
  const { title, category, status, description } = productFeedback;

  const [formData, setFormData] = React.useState<EditFormData>({
    title,
    category,
    detail: description,
    status,
  } as EditFormData);

  return (
    <article className="relative bg-slate-200 max-w-xl w-full mx-auto rounded-lg pt-12 px-8 pb-8">
      <Image
        className="absolute top-0 left-0 ml-8 -translate-y-1/2 "
        width={56}
        height={56}
        src="/shared/icon-edit-feedback.svg"
        alt=""
        aria-hidden
      />
      <h1 className="text-2xl font-bold text-brand-american_blue mb-16">
        Editing &#39;{title}&#39;
      </h1>
      <form className="flex flex-col gap-6 ">
        <FormTextInput
          title="Feedback Title"
          subTitle="Add a short, descriptive headline"
          value={formData.title}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, title: newVal })
          }
        />
        <FormSelect
          title="Update Status"
          subTitle="Choose a category for your feedback"
          options={FEEDBACK_CATEGORIES}
          value={formData.category}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, category: newVal })
          }
        />

        <FormSelect
          title="Update Status"
          subTitle="Change feedback state"
          options={FEEDBACK_STATUS}
          value={formData.status}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, status: newVal })
          }
        />

        <FormTextArea
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          value={formData.detail}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, detail: newVal })
          }
        />
        <div className="flex mt-8 gap-4">
          <Button type="button" className=" bg-red-500 text-brand-ghost_white">
            Delete
          </Button>
          <Button
            type="button"
            onClick={() => router.push(`/post/${id}`)}
            className="ml-auto bg-brand-blue_gray text-brand-ghost_white"
          >
            Cancel
          </Button>
          <Button className=" bg-brand-purple text-brand-ghost_white">
            Edit
          </Button>
        </div>
      </form>
    </article>
  );
}

export default EditFeedback;
