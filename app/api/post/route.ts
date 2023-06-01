import { createPost } from "@/app/lib/prisma";
import { PostSchema } from "@/app/lib/zod";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  console.log("test");
  try {
    const res = await req.json();
    const data = PostSchema.CreatePost.parse(res);
    await createPost(data);
    return new NextResponse(null, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map(({ path, message }) => {
        return { field: path[0], message };
      });
      return new NextResponse(JSON.stringify(errors), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({
        error: "There was a problem creating a feedback post!",
      }),
      {
        status: 500,
      }
    );
  }
}
