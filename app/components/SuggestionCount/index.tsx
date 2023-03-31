"use client";
import { use } from "react";
import { Prisma, Post } from "@prisma/client";
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
  const post = use(postsPromise);
  return <span className="text-lg font-bold">{post.length} Suggestions</span>;
}

export default SuggestionCount;
