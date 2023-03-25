import { redirect } from "next/navigation";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Comments from "../Comments";
import AddComment from "../AddComment";
import Button from "@/app/components/Button";
import { prisma } from "@/db";

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const dbPost = await prisma.post.findUnique({
    where: {
      post_id: Number(id),
    },
    select: {
      post_id: true,
      user_fk_id: true,
      upvotes: true,
      category: true,
      content: true,
      createdAt: true,
      status: true,
      title: true,
      comments: {
        select: {
          User: {
            select: {
              // the comments username to the post
              username: true,
              name: true,
              image: true,
            },
          },
          Post: {
            select: {
              User: {
                select: {
                  // the username of the the person the commenter is replyin to
                  username: true,
                  image: true,
                  name: true,
                },
              },
            },
          },
          comment_id: true,
          content: true,
        },
      },
    },
  });

  if (!dbPost) {
    redirect("/");
  }

  const comments = dbPost.comments.map((comment) => {
    return {
      comment_id: comment.comment_id,
      username: comment.User.username,
      name: comment.User.name,
      image: comment.User.image,
      replyingTo: comment.Post.User.username,
      content: comment.content,
    };
  });

  console.log(comments);

  const post = { ...dbPost, comments: comments.length };

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
      <Comments comments={comments} />
      <AddComment />
    </div>
  );
}

export default Page;
