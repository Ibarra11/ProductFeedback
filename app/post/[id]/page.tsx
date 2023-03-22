import { redirect } from "next/navigation";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import CommentList from "../Comments";
import AddComment from "../AddComment";
import Button from "@/app/components/Button";
import { prisma } from "@/db";

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      comments: true,
    },
  });

  if (!post) {
    redirect("/");
  }

  console.log(post);

  post.createdAt = post.createdAt.toString() as any;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <LinkWithChevronLeft className="text-brand-american_blue">
          Go Back
        </LinkWithChevronLeft>
        {/* <Button
          onClick={() => router.push(`/edit-feedback/${id}`)}
          className="bg-brand-purple text-brand-ghost_white"
        >
          Edit Feedback
        </Button> */}
      </div>
      <ProductRequestPost {...post} />
      {/* <CommentList comments={post.comments!} /> */}
      <AddComment />
    </div>
  );
}

export default Page;
