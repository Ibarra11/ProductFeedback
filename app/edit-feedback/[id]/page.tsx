import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { prisma } from "@/db";
import EditFeedbackForm from "../EditFeedbackForm";
import { getPost } from "@/app/lib/prisma/post";
import { redirect } from "next/navigation";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import UserProvider from "@/app/components/UserProvider";
export const dynamic = "force-dynamic";
export const revalidate = 0;
async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}
async function EditFeedback({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPost(Number(id));
  const user = await getRandomUser();
  if (!post) {
    redirect("/");
  }
  const isAuthor = post.user_fk_id === user.user_id;
  if (!isAuthor) {
    redirect("/");
  }

  return (
    <UserProvider user={user}>
      <LinkWithChevronLeft className=" mb-6">Go Back</LinkWithChevronLeft>
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
        <EditFeedbackForm {...post} />
      </section>
    </UserProvider>
  );
}

export default EditFeedback;
