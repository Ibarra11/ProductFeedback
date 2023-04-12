"use client";
import { use } from "react";

import { useFilterContext } from "../FilterProvider";
import { Post } from "@/app/lib/prisma/post";
interface Props {
  postsPromise: Promise<Post[]>;
}
function SuggestionCount({ postsPromise }: Props) {
  const posts = use(postsPromise);
  const { filterCategory } = useFilterContext();
  const filteredPosts =
    filterCategory === "All"
      ? posts
      : posts.filter(
          (product) =>
            product.category.toLowerCase() === filterCategory.toLowerCase()
        );
  return (
    <span className="text-lg font-bold">{filteredPosts.length} Posts</span>
  );
}

export default SuggestionCount;
