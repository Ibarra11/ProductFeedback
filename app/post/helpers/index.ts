import { z } from "zod";
export const addCommentSchema = z.object({
  post_fk_id: z.number(),
  content: z.string().nonempty(),
});
export function createComment(data: z.infer<typeof addCommentSchema>) {
  return fetch("/post/api/add-comment", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
