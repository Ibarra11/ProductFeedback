"use client";
import { use } from "react";
import { Prisma, Post } from "@prisma/client";
import { useFilterContext } from "../FilterProvider";
interface Props {
  postsPromise: Prisma.PrismaPromise<
    (Post & {
      _count: {
        comments: number;
      };
    })[]
  >;
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
    <span className="text-lg font-bold">
      {filteredPosts.length} Suggestions
    </span>
  );
}

export default SuggestionCount;
