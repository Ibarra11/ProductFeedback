"use client";
import data from "../../../data/data.json";
import { useRouter } from "next/navigation";
import ProductRequestPost from "@/app/components/ProductRequestPost";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import CommentList from "../CommentList";
import AddComment from "../AddComment";
import Button from "@/app/components/Button";
import { Post } from "@/types";

function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  // const post = data.productRequests.find(
  //   (product) => product.id === +id
  // ) as Post;

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex justify-between">
        <LinkWithChevronLeft className="text-brand-american_blue">
          Go Back
        </LinkWithChevronLeft>
        <Button
          onClick={() => router.push(`/edit-feedback/${id}`)}
          className="bg-brand-purple text-brand-ghost_white"
        >
          Edit Feedback
        </Button>
      </div>
      <ProductRequestPost {...post} />
      <CommentList comments={post.comments!} />
      <AddComment /> */}
    </div>
  );
}

export default Page;
