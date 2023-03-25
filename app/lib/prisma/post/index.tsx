import { prisma } from "@/db";
export type Type_Post = Awaited<ReturnType<typeof getAllPost>>;
export const getAllPost = () => {
  return prisma.post.findMany({
    include: {
      comments: true,
    },
  });
};
