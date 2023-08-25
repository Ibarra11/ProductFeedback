import { Category, Status } from "@prisma/client";
import { UseFormRegister } from "react-hook-form";
import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const EditFeedbackSchema = z.object({
  title: z.string(),
  category: z.nativeEnum(Category),
  status: z.nativeEnum(Status),
  content: z.string(),
});

export const CreateFeedbackFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required!" }),
  category: z.nativeEnum(Category),
  content: z.string().trim().min(1, { message: "Content is required!" }),
});

export type EditFeedbackFormData = z.infer<typeof EditFeedbackSchema>;

export type CreateFeedbackFormData = z.infer<typeof CreateFeedbackFormSchema>;

export type CreateFormRegister = UseFormRegister<CreateFeedbackFormData>;
export type CreateFeedbackFormFields = keyof CreateFeedbackFormData;

export type EditFormRegister = UseFormRegister<EditFeedbackFormData>;
export type EditFeedbackFormFields = keyof EditFeedbackFormData;
