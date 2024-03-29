import { createUpvote } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { UpvoteSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postIdSegment = params.id;
    const reqData = await req.json();
    const data = UpvoteSchema.CreateUpvote.parse(reqData);
    const postIdValue = UpvoteSchema.PostIdSegment.parse(postIdSegment);
    await createUpvote({ userId: data.userId, postId: postIdValue });
    return new NextResponse(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
