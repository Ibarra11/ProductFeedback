"use server";
import { getCurrentUser } from "@/lib/auth/session";
import { createPost } from "@/lib/prisma";
import { CreateFeedbackFormData } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types";

export async function createPostAction(
  formData: CreateFeedbackFormData
): ActionResult {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error();
    }
    await createPost({ ...formData, user_id: user.id });
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, message: "There was an issue with the request" };
  }
}
