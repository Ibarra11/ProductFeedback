import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { prisma } from "@/db";
import { Prisma, Category, Status } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function DELETE(req: Request) {
  const pathnameArr = new URL(req.url).pathname.split("/");
  const id = pathnameArr[pathnameArr.length - 1];
  try {
    await prisma.post.delete({
      where: {
        post_id: Number(id),
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

const formSchema: z.ZodSchema<Prisma.PostUpdateInput> = z.object({
  title: z.string().nonempty(),
  category: z.nativeEnum(Category),
  content: z.string().nonempty(),
  status: z.nativeEnum(Status),
});

export async function PUT(req: Request) {
  const pathnameArr = new URL(req.url).pathname.split("/");
  const id = pathnameArr[pathnameArr.length - 1];
  const res = await req.json();
  try {
    const data = formSchema.parse(res);
    await prisma.post.update({
      where: {
        post_id: Number(id),
      },
      data,
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
  }
}
