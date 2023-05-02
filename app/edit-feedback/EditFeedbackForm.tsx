"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Category, Status } from "@prisma/client";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import FormSelect from "../components/FormSelect";
import FormTextArea from "../components/FormTextArea";
import { T_Post } from "../lib/prisma/post";
import { useUserContext } from "../components/UserProvider";

function EditFeedbackForm(post: T_Post) {
  const router = useRouter();
  const [formData, setFormData] = React.useState(post);
  const user = useUserContext();
  const [formStatus, setFormStatus] = React.useState<
    "pending" | "idle" | "error"
  >("idle");
  const prevFormData = React.useRef(post);
  let touched = false;

  for (const prop of Object.keys(formData) as (keyof T_Post)[]) {
    if (prevFormData.current[prop] !== formData[prop]) {
      touched = true;
      prevFormData.current = formData;
      break;
    }
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormStatus("pending");
    try {
      const res = await fetch(`/api/post/${formData.post_id}`, {
        method: "PUT",
        body: JSON.stringify({ ...formData, userId: user.user_id }),
      });
      if (res.ok) {
        // @ts-ignore
        router.push(`/post/${formData.post_id}`);
        return;
      }
      setFormStatus("idle");
    } catch (e) {
      console.error(e);
      setFormStatus("idle");
    }
  }

  async function handlePostDelete() {
    setFormStatus("pending");

    try {
      const res = await fetch(`/api/post/${formData.post_id}`, {
        method: "DELETE",
        body: JSON.stringify({ userId: user.user_id }),
      });

      if (res.ok) {
        router.push("/");
        return;
      }
      setFormStatus("error");
    } catch (e) {
      setFormStatus("idle");
    }
  }
  const disabled = formStatus === "pending";

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("bg-white p-6 pt-11 rounded-lg", "md:p-10 md:pt-14")}
    >
      <h1 className={clsx("text-lg font-bold mb-6", "md:mb-10  md:text-2xl")}>
        Editing `{post.title}`
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
          options={Object.keys(Category) as Category[]}
          value={formData.category}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, category: newVal })
          }
        />

        <FormSelect
          title="Update Status"
          subTitle="Change feedback state"
          options={Object.keys(Status) as Status[]}
          value={formData.status}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, status: newVal })
          }
        />

        <FormTextArea
          title="Feedback Detail"
          subTitle="Include any specific comments on what should be improved, added, etc."
          value={formData.content}
          handleValueChange={(newVal) =>
            setFormData({ ...formData, content: newVal })
          }
        />
        <div
          className={clsx("flex flex-col-reverse mt-4 gap-4", "md:flex-row")}
        >
          <Button
            onClick={handlePostDelete}
            type="button"
            className={clsx(
              "bg-red-500 text-brand-ghost_white",
              disabled && "opacity-50"
            )}
            disabled={disabled}
          >
            Delete
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className={clsx(
              "bg-brand-blue_gray text-brand-ghost_white",
              "md:ml-auto",
              disabled && "opacity-50"
            )}
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            disabled={disabled || !touched}
            className={clsx(
              "bg-brand-purple text-brand-ghost_white",
              (disabled || !touched) && "opacity-50"
            )}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditFeedbackForm;
