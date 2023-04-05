import { prisma } from "@/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
const upvoteSchema = z.object({
  userId: z.number().int(),
});

export async function POST(req: Request) {
  const postId = new URL(req.url).pathname.split("/").slice(-2)[0];
  const reqData = await req.json();
  try {
    const data = upvoteSchema.parse(reqData);
    await prisma.upvotes.create({
      data: {
        post_fk_id: Number(postId),
        user_fk_id: data.userId,
      },
    });
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
