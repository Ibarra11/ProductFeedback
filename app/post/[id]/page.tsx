import data from "../../../data.json";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import ButtonWithChevronLeft from "@/app/components/ButtonWithChevronLeft";
import CommentList from "../CommentList";
import AddComment from "../AddComment";
import Button from "@/app/components/Button";
import { Post } from "@/types";

function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = data.productRequests.find(
    (product) => product.id === +id
  ) as Post;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between">
        <ButtonWithChevronLeft withBg={false}>Go Back</ButtonWithChevronLeft>
        <Button className="bg-brand-purple text-brand-ghost_white">
          Edit Feedback
        </Button>
      </div>
      <ProductRequestPost {...post} />
      <CommentList comments={post.comments!} />
      <AddComment />
    </div>
  );
}

export default Page;
