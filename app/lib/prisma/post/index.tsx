import { prisma } from "@/db";

export type Post = NonNullable<Awaited<ReturnType<typeof getPost>>>;
export type T_Comment = Awaited<ReturnType<typeof getCommentsByPostId>>[number];
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

// export const getPostWithComments = async (id: number) => {
//   const data = await prisma.post.findUnique({
//     where: {
//       post_id: Number(id),
//     },
//     include: {
//       comments: {
//             include: {
//             User: true
//         }
//         },
//         post
//     },
//   });
//   if (data) {
//     const post: Type_Post = {
//       post_id: data.post_id,
//       user_fk_id: data.user_fk_id,
//       upvotes: data.upvotes,
//       category: data.category,
//       content: data.content,
//       createdAt: data.createdAt,
//       status: data.status,
//       title: data.title,
//       comments: data.comments,
//     };
//   }
// };
