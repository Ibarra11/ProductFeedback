import { z } from "zod";
const PostIdSegment = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !Number.isNaN(val), {
    message: "invalid input",
  });

const CreateUpvote = z.object({
  userId: z.number(),
});
const DeleteUpvote = z.number();
export const UpvoteSchema = {
  PostIdSegment,
  CreateUpvote,
  DeleteUpvote,
};
