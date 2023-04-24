import { Metadata } from "next";
import React, { Suspense } from "react";
import clsx from "clsx";
import PostsProvider from "./components/PostsProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import { getAllPost } from "./lib/prisma/post";
import UserProvider from "./components/UserProvider";
import { convertDateToString } from "./utils";
import { prisma } from "@/db";
import PostSkeleton from "./components/PostSkeleton";

export const metadata: Metadata = {
  title: "Feedback Board",
  description: "A forum for feedback",
};

async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}
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

  const user = await getRandomUser();

  return (
    <div
      className={clsx(
        "h-full max-w-5xl w-full mx-auto flex flex-col",
        "md:gap-10",
        "lg:flex-row"
      )}
    >
      <UserProvider user={user}>
        <PostsProvider>
          <Sidebar postsPromise={postsPromise} />
          <div className={clsx("flex flex-col flex-1   gap-8", "lg:gap-6")}>
            <Header postsPromise={postsPromise} />
            <Suspense fallback={<PostSkeleton posts={5} />}>
              <Posts postsPromise={postsPromise} />
            </Suspense>
          </div>
        </PostsProvider>
      </UserProvider>
    </div>
  );
}
