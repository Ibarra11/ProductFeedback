import { z } from "zod";
import { prisma } from "@/db";
import { Category, Post, Prisma } from "@prisma/client";

export const formSchema: z.ZodSchema<Prisma.PostUncheckedCreateInput> =
  z.object({
    user_id: z.number(),
    title: z.string().nonempty(),
    category: z.nativeEnum(Category),
    content: z.string().nonempty(),
  });

export const addPost = (post: Prisma.PostUncheckedCreateInput) => {
  return prisma.post.create({
    data: {
      ...post,
    },
  });
};
