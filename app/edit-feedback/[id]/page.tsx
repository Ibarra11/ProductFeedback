import React from "react";
import Image from "next/image";
import clsx from "clsx";
import EditFeedbackForm from "../EditFeedbackForm";
import { getPost } from "@/lib/prisma/Post";
import { redirect } from "next/navigation";
import GoBackLink from "@/components/GoBackLink";
import { getCurrentUser } from "@/lib/auth/session";
import { z } from "zod";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPost(Number(params.id));

  if (!post) {
    throw new Error();
  }
  return { title: `Editing Post: ${post.title}`, description: post.content };
}

async function EditFeedback({ params }: { params: { id: string } }) {
  const id = z
    .string()
    .transform(Number)
    .refine((val) => !Number.isNaN(val))
    .safeParse(params.id);
  /* 
    this will fail if the url does not contain a number.  I know this fails without checking the db because post are given numbers as id's.
    valid: post/1 post/2
    invalid: post/hello post/example
  */
  if (!id.success) {
    redirect("/");
  }

  const [post, user] = await Promise.all([getPost(id.data), getCurrentUser()]);
  if (!post || !user) {
    redirect("/");
  }
  const isAuthor = post.user_id === user.id;
  // If there not the author of the post, then we redirect them.
  if (!isAuthor) {
    redirect("/");
  }

  return (
    <>
      <GoBackLink className=" mb-6">Go Back</GoBackLink>
      <section className="relative pt-5 md:pt-7">
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
        <EditFeedbackForm post={post} />
      </section>
    </>
  );
}

export default EditFeedback;
