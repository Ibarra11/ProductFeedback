import { z } from "zod";
export const profileFormSchema = z.object({
  image: z.string(),
  username: z.string().refine((val) => {
    return /^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(val);
  }, "Your username should be between 5 & 15 characters long and must start with a letter followed by letters, numbers, or _."),
  email: z.string().email("Please enter a valid email address!"),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
