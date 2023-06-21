import { FeedbackFormData } from "@/app/new-feedback/NewFeedbackForm";

export async function createPostRequest(
  data: FeedbackFormData
): Promise<{ status: "success" | "error"; error?: string }> {
  const res = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return { status: "success" };
  }
  return {
    status: "error",
    error: "Request can not be made at this time please try again",
  };
}
