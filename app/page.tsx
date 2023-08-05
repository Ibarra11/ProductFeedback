import { Metadata } from "next";
import React from "react";
import clsx from "clsx";
import PostsProvider from "./components/PostsProvider";
import SubHeader from "./components/SubHeader";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import { getAllPost } from "./lib/prisma/Post";
import { minDelay } from "./lib/helpers";
import UserProvider from "./components/UserProvider";
import { convertDateToString } from "./utils";
import MobileHeader from "./components/MobileHeader";
import { getCurrentUser } from "./lib/auth/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Feedback Board",
  description: "A forum for feedback",
};

export default async function Home() {
  const postsPromise = minDelay(
    getAllPost().then((posts) =>
      posts.map((post) => ({
        ...post,
        createdAt: convertDateToString(post.createdAt),
      }))
    ),
    750
  );

  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div
      className={clsx(
        "mx-auto flex h-full w-full max-w-5xl flex-col",
        "md:gap-10",
        "lg:flex-row"
      )}
    >
      <UserProvider user={user}>
        <PostsProvider>
          <Sidebar user={user} postsPromise={postsPromise} />
          <MobileHeader user={user} postsPromise={postsPromise} />
          <div className={clsx("flex flex-1 flex-col gap-8", "lg:gap-6")}>
            <SubHeader postsPromise={postsPromise} />
            <Posts postsPromise={postsPromise} />
          </div>
        </PostsProvider>
      </UserProvider>
    </div>
  );
}
