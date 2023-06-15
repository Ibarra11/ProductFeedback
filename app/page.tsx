import { Metadata } from "next";
import React from "react";
import clsx from "clsx";
import PostsProvider from "./components/PostsProvider";
import SubHeader from "./components/SubHeader";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import { getAllPost } from "./lib/prisma/Post";
import UserProvider from "./components/UserProvider";
import { convertDateToString } from "./utils";
import MobileHeader from "./components/MobileHeader";
import RoadmapList from "./components/Sidebar/RoadmapList";
import { getCurrentUser } from "./lib/auth/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Feedback Board",
  description: "A forum for feedback",
};

function delay(ms: number, data: any) {
  return new Promise((res) => {
    setTimeout(() => res(data), ms);
  });
}
export default async function Home() {
  const postsPromise = getAllPost().then((posts) => {
    const newPosts = posts.map((post) => {
      return { ...post, createdAt: convertDateToString(post.createdAt) };
    });
    return delay(500, newPosts) as Promise<typeof newPosts>;
  });

  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  console.log(user);

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
          <MobileHeader>
            <RoadmapList postsPromise={postsPromise} />
          </MobileHeader>
          <div className={clsx("flex flex-1 flex-col gap-8", "lg:gap-6")}>
            <SubHeader postsPromise={postsPromise} />
            <Posts postsPromise={postsPromise} />
          </div>
        </PostsProvider>
      </UserProvider>
    </div>
  );
}
