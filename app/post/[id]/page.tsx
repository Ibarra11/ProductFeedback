import { redirect } from "next/navigation";
import { z } from "zod";
import { Metadata } from "next";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import { convertDateToString } from "@/app/utils";
import {
  getCommentsByPostId,
  getPostWithCommentCount,
} from "@/app/lib/prisma/Post";
import UserProvider from "@/app/components/UserProvider";
import PostContainer from "../components/PostContainer";
import { getCurrentUser } from "@/app/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const post = await getPostById(Number(params.id));
//   if (!post) {
//     throw new Error();
//   }
//   return { title: post.title, description: post.content };
// }

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
    <div className="space-y-6">
      <PostContainer user={user} post={post} />
      <Comments user={user} comments={comments} />
      <AddComment userId={user.id} postId={postId} />
    </div>
  );
}

export default Page;
