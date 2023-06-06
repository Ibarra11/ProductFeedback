import { prisma } from "@/db";

export const createUpvote = async ({
  userId,
  postId,
}: {
  postId: number;
  userId: string;
}) => {
  return await prisma.upvotes.create({
    data: {
      post_id: postId,
      user_id: userId,
    },
  });
};

export const deleteUpvote = async ({ upvote_id }: { upvote_id: number }) => {
  await prisma.upvotes.delete({
    where: {
      upvote_id,
    },
  });
};
