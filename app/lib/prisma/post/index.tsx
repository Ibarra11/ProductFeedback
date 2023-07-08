import { convertDateToString } from "@/app/utils";
import { prisma } from "@/db";
import { Prisma, Status } from "@prisma/client";

export type T_PostWithComemntCount = NonNullable<
  Awaited<ReturnType<typeof getPostWithCommentCount>>
>;
export type T_Comment = Awaited<ReturnType<typeof getCommentsByPostId>>[number];
// export type T_Post = NonNullable<Awaited<ReturnType<typeof getPost>>>;

type ConvertDateToString<T extends Promise<Array<{ createdAt: Date }>>> =
  Awaited<T> extends Array<infer TData>
    ? Omit<TData, "createdAt"> & { createdAt: string }
    : never;
export type Post = ConvertDateToString<ReturnType<typeof getAllPost>>;
export type Comment = ConvertDateToString<
  ReturnType<typeof getCommentsByPostId>
>;

export const getAllPost = async () => {
  return await prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: {
      upvotes: {
        select: {
          id: true,
          User: {
            select: {
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  });
};

export const getPost = async (id: number) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const getPostWithCommentCount = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  });
  if (!result) {
    return null;
  }
  return { ...result, createdAt: convertDateToString(result.createdAt) };
};

export const getCommentsByPostId = async (postId: number) => {
  return await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      post_id: postId,
      replyingTo: null,
    },
    include: {
      User: true,
      replies: {
        select: {
          comment_id: true,
        },
      },
      Post: {
        select: {
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const updatePost = async ({
  postId,
  userId,
  data,
}: {
  postId: number;
  userId: string;
  data: Prisma.PostUpdateInput;
}) => {
  return await prisma.post.update({
    where: {
      id_user_id: {
        id: postId,
        user_id: userId,
      },
    },
    data,
  });
};

export const getPostByStatus = async (option: Status) => {
  return await prisma.post.findMany({
    where: {
      status: Status[option],
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  });
};

export const deletePost = async ({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) => {
  return await prisma.post.delete({
    where: {
      id_user_id: {
        id: postId,
        user_id: userId,
      },
    },
  });
};

export const createPost = (post: Prisma.PostUncheckedCreateInput) => {
  return prisma.post.create({
    data: {
      ...post,
    },
  });
};
