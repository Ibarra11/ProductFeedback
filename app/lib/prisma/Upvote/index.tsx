import { prisma } from "@/db";

export const createUpvote = async ({
  user_fk_id,
  post_fk_id,
}: {
  post_fk_id: number;
  user_fk_id: number;
}) => {
  return await prisma.upvotes.create({
    data: {
      post_fk_id,
      user_fk_id,
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
