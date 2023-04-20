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
import { Category, Status } from "@prisma/client";
import PostSkeleton from "./components/PostSkeleton";
import useMeasure from "react-use-measure";

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

export default async function Home() {
  const postsPromise: Promise<
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
  > = getAllPost().then((posts) => {
    return new Promise((res) => {
      setTimeout(() => {
        const data = posts.map((post) => {
          return { ...post, createdAt: convertDateToString(post.createdAt) };
        });
        res(data);
      }, 1000);
    });
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
