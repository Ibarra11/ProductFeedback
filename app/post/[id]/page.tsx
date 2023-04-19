import { redirect } from "next/navigation";
import { Metadata } from "next";
import Post from "../Post";
import CustomLink from "@/app/components/CustomLink";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Comments from "../Comments";
import AddComment from "../AddComment";
import { prisma } from "@/db";
import { convertDateToString } from "@/app/utils";
import {
  getCommentsByPostId,
  getPostWithCommentCount,
} from "@/app/lib/prisma/post";
import UserProvider from "@/app/components/UserProvider";
import { cache } from "react";

const getPostsForUser = cache(async (postId: number, whereFrom: string) => {
  const post = await getPostWithCommentCount(postId).then((post) => {
    if (!post) {
      return null;
    }
    return { ...post, createdAt: convertDateToString(post.createdAt) };
  });
  return post;
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPostsForUser(Number(params.id), "metadata");
  if (!post) {
    throw new Error();
  }
  return { title: post.title, description: post.content };
}

async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[randomIndex];
}

async function Page({ params }: { params: { id: string } }) {
  const postId = Number(params.id);

  const [post, comments, user] = await Promise.all([
    getPostsForUser(postId, "page"),
    getCommentsByPostId(postId).then((comments) => {
      return comments.map((comment) => {
        return {
          ...comment,
          createdAt: convertDateToString(comment.createdAt),
        };
      });
    }),
    getRandomUser(),
  ]);

  if (!post) {
    redirect("/");
  }

  const isAuthor = post.user_fk_id === user.user_id;

  return (
    <UserProvider user={user}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <LinkWithChevronLeft className="text-brand-american_blue">
            Go Back
          </LinkWithChevronLeft>
          {isAuthor && (
            <CustomLink href={`/edit-feedback/${postId}`}>
              Edit Feedback
            </CustomLink>
          )}
        </div>
        <Post {...post} />
        <Comments comments={comments} />
        <AddComment postFkId={post.post_id} />
      </div>
    </UserProvider>
  );
}

export default Page;
