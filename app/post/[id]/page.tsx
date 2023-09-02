import { redirect } from "next/navigation";
import { z } from "zod";
import { Metadata } from "next";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import { convertDateToString } from "@/lib/utils";
import {
  getCommentsByPostId,
  getPostWithCommentCount,
} from "@/lib/prisma/Post";
import UserProvider from "@/components/UserProvider";
import PostContainer from "../components/PostContainer";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPostWithCommentCount(Number(params.id));
  if (!post) {
    throw new Error();
  }
  return { title: post.title, description: post.content };
}

async function Page({ params: { id } }: { params: { id: string[] } }) {
  const rawPostId = z
    .string()
    .transform(Number)
    .refine((val) => !Number.isNaN(val))
    .safeParse(id);
  if (!rawPostId.success) {
    redirect("/");
  }

  const postId = rawPostId.data;
  const postPromise = getPostWithCommentCount(postId);
  const commentsPromise = getCommentsByPostId(postId).then((comments) => {
    return comments.map((comment) => {
      return {
        ...comment,
        createdAt: convertDateToString(comment.createdAt),
      };
    });
  });
  const [post, comments, user] = await Promise.all([
    postPromise,
    commentsPromise,
    getCurrentUser(),
  ]);

  if (!post) {
    redirect("/");
  }
  return (
    <UserProvider user={user}>
      <div className="flex flex-col h-full gap-6">
        <PostContainer user={user} post={post} />
        <Comments comments={comments} />
        <AddComment user={user} postId={postId} />
      </div>
    </UserProvider>
  );
}

export default Page;
