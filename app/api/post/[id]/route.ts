import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { deletePost, updatePost } from "@/app/lib/prisma";
import { PostSchema } from "@/app/lib/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  try {
    const postIdValue = PostSchema.PostIdSegment.parse(params.id);

    await deletePost({
      userId: session.user.id,
      postId: postIdValue,
    });
    // status 204 indicates that the deletion was successful, and not returning any content.
    return new NextResponse(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // there was no post found for that id, so return a 404
      return new NextResponse(null, {
        status: 404,
      });
    }
    // database connection error
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  try {
    const res = await req.json();
    const postIdValue = PostSchema.PostIdSegment.parse(params.id);
    const data = PostSchema.UpdatePost.parse(res);

    await updatePost({
      postId: postIdValue,
      userId: session.user.id,
      data,
    });
    revalidatePath(`/post/${params.id}`);
    return new NextResponse(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // there was no post found for that id or the user can't edit the post
      revalidatePath("/post/[id]");
      // revalidatePath("/edit-feedback/[id]");
      return new NextResponse(null, {
        status: 404,
      });
    }
    if (e instanceof ZodError) {
      return new NextResponse(JSON.stringify(e.issues), {
        status: 422,
      });
    }

    return new NextResponse(null, {
      status: 500,
    });
  }
}
