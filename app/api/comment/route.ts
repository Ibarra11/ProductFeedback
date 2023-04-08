import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";

const replySchema = z.object({
  content: z.string(),
  userId: z.number().int(),
  postId: z.number().int(),
  commentId: z.number().int(),
});
export async function PUT(req: Request) {
  const reqData = await req.json();
  try {
    const data = replySchema.parse(reqData);

    await prisma.comment.update({
      where: {
        comment_id: data.commentId,
      },
      data: {
        replies: {
          create: [
            {
              content: data.content,
              user_fk_id: data.userId,
              post_fk_id: data.postId,
              replyingTo: true,
            },
          ],
        },
      },
    });
    return new NextResponse(null, {
      status: 204,
    });
  } catch (e) {
    console.log(e);
  }
}

//  await prisma.user.create({
//    data: {
//      name: "user 1",
//      friends: { create: [{ name: "user 2" }, { name: "user 3" }] },
//    },
//  });
