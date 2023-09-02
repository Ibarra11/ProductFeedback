"use server";
import { getCurrentUser } from "@/lib/auth/session";
import { deletePost, getPost, updatePost } from "@/lib/prisma";
import { EditFeedbackFormData } from "@/lib/zod";
import { ActionResult } from "@/types";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function editPostAction(
  postId: Post["id"],
  formData: EditFeedbackFormData
): ActionResult {
  try {
    const [user, post] = await isAuthorized(postId);
    await updatePost({ data: formData, userId: user.id, postId: post.id });
    revalidatePath(`/post/${postId}`);
    return { success: true, data: null };
  } catch (e) {
    return { success: false, message: "There was an issue with the request" };
  }
}

export async function deletePostAction(postId: Post["id"]): ActionResult {
  try {
    const [user, post] = await isAuthorized(postId);
    await deletePost({ postId: post.id, userId: user.id });
    revalidatePath("/");
    return { success: true, data: null };
  } catch (e) {
    return { success: false, message: "There was an issue with the request" };
  }
}

/* 
    Before the user can delete or edit a post these function runs to ensure that the user has a session and there is a post corresponding to the postId.  I could also verify here that the post belongs to the user but the query handles that.  Because, the query will fail if the postId does not belong to the user.  
*/
async function isAuthorized(postId: Post["id"]) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error();
  }
  const post = await getPost(postId);
  if (!post) {
    throw new Error();
  }
  return [user, post] as const;
}
