"use client";
import React from "react";
import ProductRequestPost from "./ProductRequestPost";
import { FeedbackCategories } from "@/types";
import data from "../../../data.json";
import { useFilterContext } from "../FilterProvider";

const POSTS = data.productRequests;

type Comment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};
interface Post {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  comments?: Comment[];
  category: FeedbackCategories;
}

function ProductRequestList() {
  const [productRequest, setProductRequest] = React.useState<Post[]>(
    POSTS as any
  );
  const { filterCategory } = useFilterContext();

  const filteredProducts =
    filterCategory === "All"
      ? productRequest
      : productRequest.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );

  return (
    <div className="flex flex-col gap-5">
      {filteredProducts.map((post) => (
        <ProductRequestPost key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProductRequestList;
