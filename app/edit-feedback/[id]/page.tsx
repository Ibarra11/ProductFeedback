"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
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
    <div className={clsx("relative  pt-5", "md:pt-7")}>
      <Image
        src="/shared/icon-edit-feedback.svg"
        className={clsx("absolute top-0 left-6", "md:hidden")}
        width={40}
        height={40}
        alt=""
        aria-hidden
      />
      <Image
        src="/shared/icon-edit-feedback.svg"
        className={clsx("hidden top-0 left-10", "md:block md:absolute")}
        width={56}
        height={56}
        alt=""
        aria-hidden
      />

      <form
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
          <div
            className={clsx("flex flex-col-reverse mt-4 gap-4", "md:flex-row")}
          >
            <Button type="button" className="bg-red-500 text-brand-ghost_white">
              Delete
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className={clsx(
                "bg-brand-blue_gray text-brand-ghost_white",
                "md:ml-auto"
              )}
            >
              Cancel
            </Button>
            <Button className="bg-brand-purple text-brand-ghost_white">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditFeedback;
