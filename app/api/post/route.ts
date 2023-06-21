import { createPost } from "@/app/lib/prisma";
import { PostSchema } from "@/app/lib/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const res = await req.json();
    const data = PostSchema.CreatePost.parse({
      ...res,
      user_id: session.user.id,
    });
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
