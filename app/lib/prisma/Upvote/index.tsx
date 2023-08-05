import { prisma } from "@/db";
import { Post, Upvote, User } from "@prisma/client";

export const createUpvote = async ({
  userId,
  postId,
}: {
  postId: Post["id"];
  userId: User["id"];
}) => {
  return await prisma.upvote.create({
    data: {
      post_id: postId,
      user_id: userId,
    },
  });
};

export const deleteUpvote = async ({
  userId,
  postId,
}: {
  userId: User["id"];
  postId: Post["id"];
}) => {
  await prisma.upvote.delete({
    where: {
      post_id_user_id: {
        post_id: postId,
        user_id: userId,
      },
    },
  });
};
