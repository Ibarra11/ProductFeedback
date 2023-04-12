import React from "react";
import clsx from "clsx";
import FilterProvider from "./components/FilterProvider";
import PostsProvider from "./components/SortProvider";
import FeedbackPosts from "./components/FeedbackPosts";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import SuggestionCount from "./components/SuggestionCount";
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
  const posts: Promise<Post[]> = getAllPost().then((data) => {
    return data.map((post) => {
      return { ...post, createdAt: convertDateToString(post.createdAt) };
    }) as any;
  });

  const user = await getRandomUser();
  return (
    <UserProvider user={user}>
      <FilterProvider>
        <div className={clsx("h-full pb-14", "md:pt-14 md:pb-20 md:px-10 ")}>
          <div
            className={clsx(
              "h-full max-w-5xl mx-auto flex flex-col",
              "md:gap-10",
              "lg:flex-row"
            )}
          >
            {/* shown on tablet to desktop */}
            <Sidebar />

            {/* only shown on mobile to tablet */}
            <MobileHeader />
            <div
              className={clsx("flex h-full flex-col flex-1 gap-8", "lg:gap-6")}
            >
              <PostsProvider>
                <Header>
                  <React.Suspense fallback={<p>Loading</p>}>
                    <SuggestionCount postsPromise={posts} />
                  </React.Suspense>
                </Header>
                <React.Suspense fallback={<p>Loading</p>}>
                  <FeedbackPosts postsPromise={posts} />
                </React.Suspense>
              </PostsProvider>
            </div>
          </div>
        </div>
      </FilterProvider>
    </UserProvider>
  );
}

{
  // /* @ts-expect-error Async Server Component */
}
