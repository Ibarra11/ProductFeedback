import { z } from "zod";
export const RepliesSchema = z.object({
  replies: z.array(
    z.object({
      comment_id: z.number(),
    })
  ),
});
export const CommentRepliesSchema = z.object({
  comments: z.array(
    z.object({
      comment_id: z.number(),
      replyingTo: z.string(),
      createdAt: z.string(),
      post_fk_id: z.number(),
      user_fk_id: z.number(),
      content: z.string(),
      Post: z.object({
        User: z.object({
          username: z.string(),
        }),
      }),
      User: z.object({
        user_id: z.number(),
        image: z.string(),
        name: z.string(),
        username: z.string(),
      }),
      replies: RepliesSchema.shape.replies,
    })
  ),
});
