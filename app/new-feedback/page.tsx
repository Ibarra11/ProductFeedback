import Image from "next/image";
import clsx from "clsx";
import LinkWithChevronLeft from "../components/LinkWithChevronLeft";
import NewFeedbackForm from "./NewFeedbackForm";

import { prisma } from "@/db";
async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}
async function Page() {
  const user = await getRandomUser();
  return (
    <>
      <LinkWithChevronLeft className="mb-10">Go Back</LinkWithChevronLeft>
      <section className={clsx("relative  pt-5", "md:pt-7")}>
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
        <NewFeedbackForm user={user} />
      </section>
    </>
  );
}

export default Page;
