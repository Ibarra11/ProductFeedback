import React, { Suspense } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Category, Status } from "@prisma/client";
import LoadingCircle from "../LoadingCircle";
import CustomLink from "../CustomLink";
import PostsCount from "../PostsCount";
import SortBySelect from "./SortByCategorySelect";
interface Props {
  postsPromise: Promise<
    {
      createdAt: string;
      post_id: number;
      title: string;
      content: string;
      category: Category;
      status: Status;
      user_fk_id: number;
      _count: {
        comments: number;
        upvotes: number;
      };
    }[]
  >;
}
function SubHeader({ postsPromise }: Props) {
  return (
    <div
      className={clsx(
        "flex items-center h-14 px-6 bg-brand-american_blue",
        "md:h-[72px] md:gap-9 md:rounded-lg md:pr-3",
        "lg:gap-8 lg:pr-4"
      )}
    >
      <div
        className={clsx(
          "hidden",
          "md:flex md:gap-4 md:items-center  md:text-brand-ghost_white"
        )}
      >
        <Image
          width={24}
          height={24}
          src="/suggestions/icon-suggestions.svg"
          alt=""
          aria-hidden
        />
        <Suspense fallback={<LoadingCircle />}>
          <PostsCount postsPromise={postsPromise} />
        </Suspense>
      </div>
      <SortBySelect />
      <div className="hidden sm:block ml-auto">
        <CustomLink
          // @ts-ignore
          href="/new-feedback"
        >
          + Add Feedback
        </CustomLink>
      </div>
    </div>
  );
}

export default SubHeader;
