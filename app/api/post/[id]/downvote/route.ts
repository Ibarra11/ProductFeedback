import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteUpvote } from "@/lib/prisma";
import { UpvoteSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const postId = UpvoteSchema.DeleteUpvote.parse(Number(params.id));

    // This will throw an error if there isn't an upvote with a matching userId and postId.  This will make sure that the post belongs to the user.
    await deleteUpvote({ userId: session.user.id, postId });
    return new NextResponse(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse("Unauthorized", {
        status: 403,
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
