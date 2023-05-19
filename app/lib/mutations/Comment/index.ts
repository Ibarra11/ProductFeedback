import { Comment } from "../../prisma";
import { CommentSchema } from "../../zod";

export type GetReplies = typeof getReplies;
export async function getReplies(replies: Comment["replies"]) {
  const replyIds = replies.map((reply) => `ids=${reply.comment_id}`).join("&");
  const res = await fetch(`/api/comment/?${replyIds}`);
  const rawData = await res.json();
  const { comments } = CommentSchema.replies.parse(rawData);
  return comments;
}
