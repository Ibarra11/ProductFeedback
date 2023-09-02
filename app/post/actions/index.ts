"use server";
import { getCurrentUser } from "@/lib/auth/session";
import { createComment, createReply, getRepliesToComments } from "@/lib/prisma";
import { CommentSchema, ZCommentSchema } from "@/lib/zod";
import { ActionResult } from "@/types";

export async function createCommentAction(
  data: ZCommentSchema["createComment"]
): ActionResult {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error();
    }
    const { content, postId } = CommentSchema.createComment.parse(data);
    await createComment({
      content,
      postId,
      userId: user.id,
    });
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      message: "There was an issue with the request",
    };
  }
}

export async function replyCommentAction(
  data: ZCommentSchema["createReply"]
): ActionResult<ZCommentSchema["replies"]> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error();
    }
    const parsedData = CommentSchema.createReply.parse(data);
    const replies = await createReply({ ...parsedData, userId: user.id });
    return { success: true, data: replies };
  } catch (e) {
    return {
      success: false,
      message: "There was an issue with the request",
    };
  }
}

export async function getRepliesAction(
  data: ZCommentSchema["replies"]
): ActionResult<ZCommentSchema["comments"]["comments"]> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error();
    }
    const commentIds = CommentSchema.replies.parse(data);
    const processedIds = commentIds.replies.map((reply) => reply.comment_id);
    const response = await getRepliesToComments(processedIds);
    // If there are any null comments from data, it will throw an error because an id was not found.
    const comments = CommentSchema.comments.shape.comments.parse(response);
    return { success: true, data: comments };
  } catch (e) {
    return {
      success: false,
      message: "There was an issue with the request",
    };
  }
}
