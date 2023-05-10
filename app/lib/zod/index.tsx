import { z } from "zod";

const ReplySchema = z.object({
  content: z.string(),
  userId: z.number().int(),
  postId: z.number().int(),
  commentId: z.number().int(),
  replyingTo: z.string(),
});

export const CommentSchema = {
  replyIds: z.array(z.number().int()),
  createReply: ReplySchema,
};

export type ZCommentSchema = {
  [K in keyof typeof CommentSchema]: z.infer<(typeof CommentSchema)[K]>;
};
