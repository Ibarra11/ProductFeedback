import clsx from "clsx";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cache } from "react";
import { getCommentsByPostId, getPostWithCommentCount } from "../lib/prisma";
import { convertDateToString } from "../utils";
import { prisma } from "@/db";
import PostContainer from "./components/PostContainer";
import UserProvider from "../components/UserProvider";

const getPostById = cache(async (postId: number) => {
  const post = await getPostWithCommentCount(postId).then((post) => {
    if (!post) {
      return null;
    }
    return { ...post, createdAt: convertDateToString(post.createdAt) };
  });
  return post;
});

async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[randomIndex];
}

export default async function PostLayout({
  children,
}: React.PropsWithChildren) {
  // @ts-ignore
  const postId = children.props.childProp.segment[1];

  const result = z
    .string()
    .transform(Number)
    .refine((val) => !Number.isNaN(val))
    .safeParse(postId);

  if (!result.success) {
    redirect("/");
  }

  const [post, user] = await Promise.all([
    getPostById(result.data),
    getRandomUser(),
  ]);

  if (!post) {
    redirect("/");
  }

  return (
    <UserProvider user={user}>
      <section
        className={clsx("max-w-3xl min-h-screen w-full mx-auto p-6 space-y-6")}
      >
        <PostContainer user={user} post={post} />

        {children}
      </section>
    </UserProvider>
  );
}
