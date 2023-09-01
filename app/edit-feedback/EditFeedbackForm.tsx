"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Category, Status } from "@prisma/client";
import Button from "@/components/Button";
import FormTextInput from "@/components/FormTextInput";
import FormSelect from "@/components/FormSelect";
import FormTextArea from "@/components/FormTextArea";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { EditFeedbackSchema, EditFeedbackFormData } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORY_VALUES, STATUS_VALUES } from "../constants";
import { ImSpinner8 } from "react-icons/im";
import { deletePostAction, editPostAction } from "./actions";

interface Props {
  post: Post;
}

function EditFeedbackForm({ post }: Props) {
  const router = useRouter();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFeedbackFormData>({
    resolver: zodResolver(EditFeedbackSchema),
    defaultValues: {
      title: post.title,
      category: post.category,
      status: post.status,
      content: post.content,
    },
  });
  const [isSaving, setisSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { category, status } = getValues();

  async function onSubmit(formData: EditFeedbackFormData) {
    setisSaving(true);
    try {
      const result = await editPostAction(post.id, formData);
      if (result.success) {
        router.push(`/post/${post.id}`);
      }
    } catch (e) {
    } finally {
      setisSaving(false);
    }
  }

  async function handlePostDelete() {
    setIsDeleting(true);
    try {
      const result = await deletePostAction(post.id);
      if (result.success) {
        router.push("/");
      }
    } catch (e) {
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("bg-white p-6 pt-11 rounded-lg", "md:p-10 md:pt-14")}
    >
      <h1 className={clsx("text-lg font-bold mb-6", "md:mb-10  md:text-2xl")}>
        Editing `{post.title}`
      </h1>
      <div className="flex flex-col gap-6">
        <FormTextInput<"edit">
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

        <FormSelect
          title="Update Status"
          subTitle="Change feature state"
          options={STATUS_VALUES}
          currentValue={status}
          handleChange={(value: Status) => {
            setValue("status", value, { shouldValidate: true });
          }}
          error={errors.status?.message}
        />

        <FormTextArea<"edit">
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          register={register}
          field="content"
          error={errors.content?.message}
        />
        <div
          className={clsx("flex flex-col-reverse mt-4 gap-4", "md:flex-row")}
        >
          <Button
            onClick={handlePostDelete}
            type="button"
            className={clsx(
              "relative inline-flex items-center justify-center gap-2 bg-red-500 text-brand-ghost_white",
              isSaving && "opacity-50"
            )}
            disabled={isDeleting || isSaving}
          >
            {isDeleting ? (
              <>
                Deleting
                <ImSpinner8 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className={clsx(
              "bg-brand-blue_gray text-brand-ghost_white",
              "md:ml-auto",
              isSaving || (isDeleting && "opacity-50")
            )}
            disabled={isSaving || isDeleting}
          >
            Cancel
          </Button>
          <Button
            disabled={isSaving || isDeleting}
            className={clsx(
              "relative bg-brand-purple inline-flex items-center justify-center gap-2 text-brand-ghost_white min-w-[144px]",
              isDeleting && "opacity-50"
            )}
          >
            {isSaving ? (
              <>
                Saving
                <ImSpinner8 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditFeedbackForm;
