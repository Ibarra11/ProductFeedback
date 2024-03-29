import Image from "next/image";
import clsx from "clsx";
import GoBackLink from "@/components/GoBackLink";
import NewFeedbackForm from "./NewFeedbackForm";
import { CreateFeedbackFormData } from "@/lib/zod";
import { createPost } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function Page() {
  return (
    <>
      <GoBackLink className="mb-10">Go Back</GoBackLink>
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
          className={clsx("top-0 left-10 hidden", "md:absolute md:block")}
          width={56}
          height={56}
          alt=""
          aria-hidden
        />
        <NewFeedbackForm />
      </section>
    </>
  );
}

export default Page;
