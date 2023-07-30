import { convertDateToString } from "@/app/utils";
import { prisma } from "@/db";
import { ZCommentSchema } from "../../zod";

export async function getRepliesToComments(
  commentIds: ZCommentSchema["replyIds"]
) {
  const commentPromises = commentIds.map((id) => {
    return prisma.comment.findUnique({
      where: {
        comment_id: id,
      },

      include: {
        User: true,
        Post: {
          select: {
            User: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        replies: {
          select: {
            comment_id: true,
          },
        },
      },
    });
  });
  const comments = await Promise.all(commentPromises);

  // Convert the date to string before sending back to client
  return comments.map((comment) => {
    if (comment) {
      return {
        ...comment,
        createdAt: convertDateToString(comment.createdAt),
      };
    }
    return comment;
  });
}

export async function createComment({
  content,
  postId,
  userId,
}: ZCommentSchema["createComment"]) {
  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      comments: {
        create: {
          content,
          User: {
            connect: {
              id: userId,
            },
          },
        },
      },
    },
  });
}

export async function createReply({
  commentId,
  content,
  userId,
  postId,
  replyingTo,
}: ZCommentSchema["createReply"]) {
  const { replies } = await prisma.comment.update({
    where: {
      comment_id: commentId,
    },
    select: {
      replies: {
        select: {
          comment_id: true,
        },
      },
    },
    data: {
      replies: {
        create: [
          {
            user_id: userId,
            content,
            post_id: postId,
            replyingTo,
          },
        ],
      },
    },
  });
  // we reverse the replies to get the last inserted first, I would preferably like to do this in prisma,but I have not found a way.
  return { replies: replies.reverse() };
}
