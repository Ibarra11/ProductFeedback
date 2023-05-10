import { createUpvote } from "@/app/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { UpvoteSchema } from "@/app/lib/zod";

export async function POST(req: Request) {
  const postIdSegment = new URL(req.url).pathname.split("/").slice(-2)[0];
  const reqData = await req.json();
  try {
    const data = UpvoteSchema.CreateUpvote.parse(reqData);
    const postIdValue = UpvoteSchema.PostIdSegment.parse(postIdSegment);
    await createUpvote({ user_fk_id: data.userId, post_fk_id: postIdValue });
    return new NextResponse(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return new NextResponse(e.message, {
        status: 404,
      });
    }
    if (e instanceof ZodError) {
      return new NextResponse(JSON.stringify(e.issues), {
        status: 422,
      });
    }
    // database connection error
    return new NextResponse(null, {
      status: 500,
    });
  }
}
