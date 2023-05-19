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
                username: true,
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
  post_fk_id,
  user_fk_id,
}: {
  content: string;
  post_fk_id: number;
  user_fk_id: number;
}) {
  return await prisma.comment.create({
    data: {
      content,
      post_fk_id,
      user_fk_id,
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
            content,
            user_fk_id: userId,
            post_fk_id: postId,
            replyingTo: replyingTo,
          },
        ],
      },
    },
  });
  // we reverse the replies to get the last inserted first, I would preferably like to do this in prisma,but have not found a way.
  return { replies: replies.reverse() };
}
