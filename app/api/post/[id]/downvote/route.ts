import { deleteUpvote } from "@/app/lib/prisma";
import { UpvoteSchema } from "@/app/lib/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  // I send the upvote id through search params becuase a delete HTTP verb can not accept a body.
  const rawData = url.searchParams.get("upvoteId");
  try {
    const upvote_id = UpvoteSchema.DeleteUpvote.parse(Number(rawData));
    await deleteUpvote({ upvote_id });
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
