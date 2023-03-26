import { redirect } from "next/navigation";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import Comments from "../Comments";
import AddComment from "../AddComment";
import { getOnePost } from "@/app/lib/prisma/post";
import Button from "@/app/components/Button";

export const dynamic = "force-dynamic";
export const revalidate = 60;
async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const dbPost = await getOnePost(Number(id));

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
  const post = { ...dbPost, comments: dbPost.comments };
  console.log("post:", post.post_id);
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
      <AddComment postFkId={post.post_id} />
    </div>
  );
}

export default Page;
