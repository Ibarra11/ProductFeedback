import { Comment } from "../../prisma";
import { CommentSchema } from "../../zod";
import { ZCommentSchema } from "../../zod";

export type GetReplies = typeof getReplies;
export async function getReplies(replies: Comment["replies"]) {
  const replyIds = replies.map((reply) => `ids=${reply.comment_id}`).join("&");
  const res = await fetch(`/api/comment/?${replyIds}`);
  const rawData = await res.json();
  console.log("test ----------");
  console.log(rawData);
  const { comments } = CommentSchema.comments.parse(rawData);
  return { comments };
}

export async function addReply(reply: ZCommentSchema["createReply"]) {
  const res = await fetch("/api/comment", {
    method: "PUT",
    body: JSON.stringify(reply),
  });
  const rawData = await res.json();
  const replies = CommentSchema.replies.parse(rawData);
  return replies;
}
