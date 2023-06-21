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
    user_id: z.string().trim().min(1, { message: "Is Required" }),
    title: z.string().trim().min(1, { message: "Is Required" }),
    category: z.nativeEnum(Category),
    content: z.string().trim().min(1, { message: "Is Required" }),
  });

export const PostSchema = {
  DeletePost,
  PostIdSegment,
  UpdatePost,
  CreatePost,
};

export type ZPostSchema = {
  [K in keyof typeof PostSchema]: z.infer<(typeof PostSchema)[K]>;
};
