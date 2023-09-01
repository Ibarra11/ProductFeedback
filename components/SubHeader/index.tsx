import React, { Suspense } from "react";
import Image from "next/image";
import clsx from "clsx";
import LoadingCircle from "../LoadingCircle";
import CustomLink from "../CustomLink";
import PostsCount from "../PostsCount";
import SortBySelect from "./SortByCategorySelect";
import { PostsPromise, User } from "@/types";

interface Props {
  postsPromise: PostsPromise;
  user: User | undefined;
}

function SubHeader({ postsPromise, user }: Props) {
  return (
    <header
      className={clsx(
        "flex items-center h-14 px-6 bg-brand-american_blue",
        " md:h-[72px]    gap-8 md:rounded-lg md:pr-3",
        "lg:pr-4"
      )}
    >
      <div className={clsx("flex  gap-4 items-center  text-brand-ghost_white")}>
        <Image
          width={24}
          height={24}
          src="/suggestions/icon-suggestions.svg"
          alt=""
          aria-hidden
        />
        <Suspense
          fallback={
            <div className="relative w-8 h-8">
              <LoadingCircle size="md" color="primary" />
            </div>
          }
        >
          <PostsCount postsPromise={postsPromise} />
        </Suspense>
      </div>
      <div className="ml-auto sm:ml-0">
        <SortBySelect />
      </div>

      <div className="hidden sm:block ml-auto">
        <CustomLink
          variant="primary"
          // @ts-ignore
          href={user ? "/new-feedback" : "/login"}
        >
          {user ? "+ Add Feedback" : "Login"}
        </CustomLink>
      </div>
    </header>
  );
}

export default SubHeader;
