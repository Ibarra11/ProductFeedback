import React from "react";
import clsx from "clsx";
import FilterProvider from "./components/FilterProvider";
import PostsProvider from "./components/SortProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SuggestionCount from "./components/SuggestionCount";
import { getAllPost, Post } from "./lib/prisma/post";
import UserProvider from "./components/UserProvider";
import InfiniteScroll from "./components/InfiniteScroll";
import { convertDateToString } from "./utils";
import { prisma } from "@/db";
import { filterPostsByStatus } from "./utils";

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
  const postsPromise: Promise<Post[]> = getAllPost().then((data) => {
    return data.map((post) => {
      return { ...post, createdAt: convertDateToString(post.createdAt) };
    }) as any;
  });

  const [user, posts] = await Promise.all([getRandomUser(), postsPromise]);

  return (
    <UserProvider user={user}>
      <FilterProvider posts={posts}>
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
              <PostsProvider>
                <Header>
                  <SuggestionCount posts={posts} />
                </Header>

                <InfiniteScroll posts={posts} />
              </PostsProvider>
            </div>
          </div>
        </div>
      </FilterProvider>
    </UserProvider>
  );
}
