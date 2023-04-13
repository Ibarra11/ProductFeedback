import React from "react";
import clsx from "clsx";
import PostsProvider from "./components/PostsProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import { getAllPost, Post } from "./lib/prisma/post";
import UserProvider from "./components/UserProvider";
import { convertDateToString } from "./utils";
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

export default async function Home() {
  const postsPromise = getAllPost();

  const [user, data] = await Promise.all([getRandomUser(), postsPromise]);

  const posts = data.map((post) => {
    return { ...post, createdAt: convertDateToString(post.createdAt) };
  });

  return (
    <UserProvider user={user}>
      <PostsProvider posts={posts}>
        <div className={clsx("h-full pb-14", "md:pt-14 md:pb-20 md:px-10 ")}>
          <div
            className={clsx(
              "h-full max-w-5xl mx-auto flex flex-col",
              "md:gap-10",
              "lg:flex-row"
            )}
          >
            <Sidebar posts={posts} />
            <div
              className={clsx("flex h-full flex-col flex-1 gap-8", "lg:gap-6")}
            >
              <Header />
              <Posts />
            </div>
          </div>
        </div>
      </PostsProvider>
    </UserProvider>
  );
}
