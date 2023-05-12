import { redirect } from "next/navigation";
import { Metadata } from "next";
import Post from "@/app/components/Post";
import CustomLink from "@/app/components/CustomLink";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import { prisma } from "@/db";
import { convertDateToString } from "@/app/utils";
import { getCommentsByPostId } from "@/app/lib/prisma/Post";
import UserProvider from "@/app/components/UserProvider";

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

async function Page({ params: { id } }: { params: { id: string } }) {
  const postId = Number(id);
  const comments = await getCommentsByPostId(postId).then((comments) => {
    return comments.map((comment) => {
      return {
        ...comment,
        createdAt: convertDateToString(comment.createdAt),
      };
    });
  });
  return (
    <div className="border-4 border-red-500 space-y-6 ">
      <Comments comments={comments} />
      <AddComment postFkId={postId} />
    </div>
  );
}

export default Page;
