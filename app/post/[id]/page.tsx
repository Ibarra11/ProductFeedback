import { redirect } from "next/navigation";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Comments from "../Comments";
import AddComment from "../AddComment";
import Button from "@/app/components/Button";
import { prisma } from "@/db";

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: {
      post_id: Number(id),
    },
    include: {
      comments: {
        include: {
          User: {
            select: {
              // The commenters username
              username: true,
            },
          },
          Post: {
            include: {
              User: {
                select: {
                  // the usename of the who the commenter is replying to
                  username: true,
                },
              },
            },
          },
        },
      },
      User: {
        select: {
          // the original posts username
          username: true,
        },
      },
    },
  });

  console.log(post);

  if (!post) {
    redirect("/");
  }

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
      {/* <Comments comments={post.comments} /> */}
      <AddComment />
    </div>
  );
}

export default Page;
