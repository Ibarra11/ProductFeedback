import React, { Suspense, use } from "react";
import Image from "next/image";
import clsx from "clsx";
import Select from "../Select";
import { Category, Status } from "@prisma/client";
import LoadingCircle from "../LoadingCircle";
import CustomLink from "../CustomLink";
import PostsCount from "../PostsCount";
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
function Header({ postsPromise }: Props) {
  return (
    <header
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
          {/* @ts-expect-error Server Component */}
          <PostsCount postsPromise={postsPromise} />
        </Suspense>
      </div>
      <Select
        options={[
          "Date Posted",
          "Most Upvotes",
          "Least Upvotes",
          "Most Comments",
          "Least Comments",
        ]}
        selectText="Sort by:"
        className="text-brand-ghost_white"
        arrowColor="ghost_white"
      />
      <CustomLink
        href="/new-feedback"
        className="ml-auto  bg-brand-purple font-bold text-sm text-brand-ghost_white"
      >
        + Add Feedback
      </CustomLink>
    </header>
  );
}

export default Header;
