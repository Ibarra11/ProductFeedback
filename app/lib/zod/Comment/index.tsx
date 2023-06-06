import { z } from "zod";

const createReply = z.object({
  content: z.string(),
  userId: z.string(),
  postId: z.number().int(),
  commentId: z.number().int(),
  replyingTo: z.string(),
});

export const RepliesSchema = z.object({
  replies: z.array(
    z.object({
      comment_id: z.number(),
    })
  ),
});

export const Comments = z.object({
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

export const createComment = z.object({
  post_fk_id: z.number(),
  content: z.string().nonempty(),
});

export const CommentSchema = {
  replyIds: z.array(z.number().int()),
  createReply,
  createComment,
  comments: Comments,
  replies: RepliesSchema,
};

export type ZCommentSchema = {
  [K in keyof typeof CommentSchema]: z.infer<(typeof CommentSchema)[K]>;
};
