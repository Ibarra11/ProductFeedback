import { z } from "zod";
const PostIdSegment = z.number().int();

const CreateUpvote = z.object({
  userId: z.number().int(),
});
const DeleteUpvote = z.number();
export const UpvoteSchema = {
  PostIdSegment,
  CreateUpvote,
  DeleteUpvote,
};
