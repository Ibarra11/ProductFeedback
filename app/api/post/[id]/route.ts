import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function DELETE(req: Request) {
  const pathnameArr = new URL(req.url).pathname.split("/");
  const id = pathnameArr[pathnameArr.length - 1];
  console.log(id);
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
    console.log(e);
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

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const { content, post_fk_id } = addCommentSchema.parse(data);
//     const users = await prisma.user.findMany();
//     const randomUserIndex = Math.floor(Math.random() * users.length);
//     await prisma.comment.create({
//       data: {
//         content,
//         post_fk_id,
//         user_fk_id: users[randomUserIndex].user_id,
//       },
//     });
//     return new NextResponse(null, {
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return new NextResponse(null, {
//       status: 500,
//     });
//   }
// }
