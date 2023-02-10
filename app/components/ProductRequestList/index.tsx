"use client";
import React from "react";
import ProductRequestPost from "../ProductRequestPost";
import data from "../../../data.json";
import { useFilterContext } from "../FilterProvider";
import { useSortContext } from "../SortProvider";
import { Post } from "@/types";
import { sortPosts } from "@/app/utils";

const POSTS = data.productRequests;

function ProductRequestList() {
  const [productRequest, setProductRequest] = React.useState<Post[]>(
    POSTS as any
  );
  const { filterCategory } = useFilterContext();
  const { sortBy } = useSortContext();

  const filteredPost =
    filterCategory === "All"
      ? productRequest
      : productRequest.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );

  const displayedPosts = sortPosts(filteredPost, sortBy);

  return (
    <div className="flex flex-col gap-5 border-2 border-red-600">
      {displayedPosts.map((post) => (
        <ProductRequestPost key={post.id} {...post} />
      ))}
    </div>
  );
}

export default ProductRequestList;
