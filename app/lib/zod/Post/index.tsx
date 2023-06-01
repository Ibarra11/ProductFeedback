import { Category, Post, Prisma, Status } from "@prisma/client";
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

export const CreatePost: z.ZodSchema<Prisma.PostUncheckedCreateInput> =
  z.object({
    user_fk_id: z.number(),
    title: z.string().nonempty(),
    category: z.nativeEnum(Category),
    content: z.string().nonempty(),
  });

export const PostSchema = {
  DeletePost,
  PostIdSegment,
  UpdatePost,
  CreatePost,
};
