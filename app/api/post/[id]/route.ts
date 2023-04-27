import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/db";
import { Prisma, Category, Status } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const postSchema: z.ZodSchema<Prisma.PostUpdateInput & { userId: number }> =
  z.object({
    title: z.string().nonempty(),
    category: z.nativeEnum(Category),
    content: z.string().nonempty(),
    status: z.nativeEnum(Status),
    userId: z.number().int(),
  });

const postDeleteSchema: z.ZodSchema<{ userId: number }> = z.object({
  userId: z.number().int(),
});

export async function DELETE(req: Request) {
  const pathnameArr = new URL(req.url).pathname.split("/");
  const postId = Number(pathnameArr[pathnameArr.length - 1]);
  const reqData = await req.json();
  try {
    const data = postDeleteSchema.parse(reqData);

    await prisma.post.delete({
      where: {
        // post_id: Number(id),
        post_id_user_fk_id: {
          post_id: Number(postId),
          user_fk_id: data.userId,
        },
      },
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
  const postId = Number(pathnameArr[pathnameArr.length - 1]);
  const res = await req.json();
  try {
    // Im sending the userid with the request, but in the future would probably get it from an API.
    const data = postSchema.parse(res);
    await prisma.post.update({
      where: {
        post_id_user_fk_id: {
          post_id: postId,
          user_fk_id: data.userId,
        },
      },
      data: {
        title: data.title,
        category: data.category,
        content: data.content,
        status: data.status,
      },
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
    console.log(e);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
