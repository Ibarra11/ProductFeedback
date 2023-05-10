import { Category, Post, Status } from "@prisma/client";
import { z } from "zod";

const DeletePost = z.object({
  userId: z.number(),
});

const PostIdSegment = z.number().int();
const UpdatePost: z.ZodSchema<
  Partial<Pick<Post, "title" | "category" | "status" | "content">> & {
    userId: number;
  }
> = z.object({
  title: z.string().nonempty(),
  category: z.nativeEnum(Category),
  content: z.string().nonempty(),
  status: z.nativeEnum(Status),
  userId: z.number().int(),
});
export const PostSchema = {
  DeletePost,
  PostIdSegment,
  UpdatePost,
};
