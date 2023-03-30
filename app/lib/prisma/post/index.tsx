import { prisma } from "@/db";

export type T_PostWithComemntCount = NonNullable<
  Awaited<ReturnType<typeof getPostWithCommentCount>>
>;
export type T_Comment = Awaited<ReturnType<typeof getCommentsByPostId>>[number];
export type T_Post = NonNullable<Awaited<ReturnType<typeof getPost>>>;

export const getAllPost = () => {
  return prisma.post.findMany({
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
};

export const getPost = async (id: number) => {
  return prisma.post.findUnique({
    where: {
      post_id: id,
    },
  });
};

export const getPostWithCommentCount = async (id: number) => {
  return prisma.post.findUnique({
    where: {
      post_id: id,
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
};

export const getCommentsByPostId = async (postId: number) => {
  return prisma.comment.findMany({
    where: {
      post_fk_id: postId,
    },
    include: {
      User: true,
      Post: {
        select: {
          User: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
};

export const updateForm = async (id: number, data: Partial<T_Post>) => {
  return prisma.post.update({
    where: {
      post_id: id,
    },
    data: data,
  });
};
