import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { deletePost, updatePost } from "@/app/lib/prisma";
import { PostSchema } from "@/app/lib/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function DELETE(req: Request) {
  const pathnameArr = new URL(req.url).pathname.split("/");
  const rawData = await req.json();
  try {
    const data = PostSchema.DeletePost.parse(rawData);
    const postIdSegment = PostSchema.PostIdSegment.parse(
      Number(pathnameArr[pathnameArr.length - 1])
    );

    await deletePost({
      user_fk_id: data.userId,
      post_id: postIdSegment,
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

export async function PUT(req: Request) {
  const pathnameArr = new URL(req.url).pathname.split("/");
  const postIdSegment = Number(pathnameArr[pathnameArr.length - 1]);
  const res = await req.json();
  try {
    // Im sending the userid with the request, but in the future would probably get it from an API.
    const postIdValue = PostSchema.PostIdSegment.parse(postIdSegment);
    const data = PostSchema.UpdatePost.parse(res);
    const postValues = Object.keys(data)
      .filter((val) => val !== "userId")
      .reduce((acc, curr) => {
        (acc as any)[curr] = (data as any)[curr];
        return acc;
      }, {} as typeof data);

    await updatePost({
      post_id: postIdValue,
      user_fk_id: data.userId,
      data: postValues,
    });
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
