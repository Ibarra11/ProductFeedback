import { prisma } from "@/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const downvoteSchema = z.object({
  upvoteId: z.number().int(),
});

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const upvoteId = url.searchParams.get("upvoteId");
  console.log(upvoteId);

  try {
    const data = z.number().parse(Number(upvoteId));
    await prisma.upvotes.delete({
      where: {
        upvote_id: data,
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
