import { Category, Post, Prisma, Status } from "@prisma/client";
import { z } from "zod";

const PostIdSegment = z
  .string()
  .transform((val) => +val)
  .refine((arg) => !Number.isNaN(arg));

const UpdatePost: z.ZodSchema<Prisma.PostUpdateInput> = z.object({
  title: z.string().nonempty(),
  category: z.nativeEnum(Category),
  content: z.string().nonempty(),
  status: z.nativeEnum(Status),
});

export const CreatePost: z.ZodSchema<Prisma.PostUncheckedCreateInput> =
  z.object({
    user_id: z.string().trim().min(1, { message: "Is Required" }),
    title: z.string().trim().min(1, { message: "Is Required" }),
    category: z.nativeEnum(Category),
    content: z.string().trim().min(1, { message: "Is Required" }),
  });

export const PostSchema = {
  PostIdSegment,
  UpdatePost,
  CreatePost,
};

export type ZPostSchema = {
  [K in keyof typeof PostSchema]: z.infer<(typeof PostSchema)[K]>;
};
