import { z } from "zod";
import { Blob } from "buffer";
const profileBaseSchema = z.object({
  image: z.string().optional(),
  name: z
    .string()
    .refine((val) => {
      return /^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(val);
    }, "Your username should be between 5 & 15 characters long and must start with a letter followed by letters, numbers, or _.")
    .optional(),
});
export const profileFormSchema = profileBaseSchema.extend({
  email: z.string().email("Please enter a valid email address!").optional(),
});

export const profileFormRequestErrors = z.object({
  errors: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
  }),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
