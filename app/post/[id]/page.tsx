import { redirect } from "next/navigation";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import CustomLink from "@/app/components/CustomLink";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Comments from "../Comments";
import AddComment from "../AddComment";
import { prisma } from "@/db";
import {
  getCommentsByPostId,
  getPostWithCommentCount,
} from "@/app/lib/prisma/post";
import UserProvider from "@/app/components/UserProvider";
export const dynamic = "force-dynamic";
export const revalidate = 0;
async function getRandomUser() {
  const user = await prisma.user.findMany({
    include: {
      Upvotes: true,
    },
  });
  const randomIndex = Math.floor(user.length * Math.random());
  return user[user.length - 1];
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [post, comments, user] = await Promise.all([
    getPostWithCommentCount(Number(id)),
    getCommentsByPostId(Number(id)),
    getRandomUser(),
  ]);

  if (!post) {
    redirect("/");
  }

  const isAuthor = post.user_fk_id === user.user_id;
  console.log(user);
  console.log(post);

  return (
    <UserProvider user={user}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <LinkWithChevronLeft className="text-brand-american_blue">
            Go Back
          </LinkWithChevronLeft>
          {isAuthor && (
            <CustomLink href={`/edit-feedback/${id}`}>Edit Feedback</CustomLink>
          )}
          {/* <Button
          onClick={() => router.push(`/edit-feedback/${id}`)}
          className="bg-brand-purple text-brand-ghost_white"
        >
          Edit Feedback
        </Button> */}
        </div>
        <ProductRequestPost {...post} />
        <Comments comments={comments} />
        <AddComment postFkId={post.post_id} />
      </div>
    </UserProvider>
  );
}

export default Page;
