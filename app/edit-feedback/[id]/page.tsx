import React from "react";
import Image from "next/image";
import clsx from "clsx";
import EditFeedbackForm from "../EditFeedbackForm";
import { getPost } from "@/app/lib/prisma/post";
import { redirect } from "next/navigation";

async function EditFeedback({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPost(Number(id));
  if (!post) {
    redirect("/");
  }

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
      <EditFeedbackForm {...post} />
    </div>
  );
}

export default EditFeedback;
