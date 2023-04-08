import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";

const replySchema = z.object({
  content: z.string(),
  userId: z.number().int(),
  postId: z.number().int(),
  commentId: z.number().int(),
  replyingTo: z.string(),
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
              replyingTo: data.replyingTo,
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

const schema = z.array(z.number().int());

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParamIds = url.searchParams.getAll("ids").map(Number);
  try {
    const commentIds = schema.parse(searchParamIds);
    const commentPromises = commentIds.map((id) => {
      return prisma.comment.findUnique({
        where: {
          comment_id: id,
        },
        include: {
          User: true,
          replies: true,
        },
      });
    });
    const comments = await Promise.all(commentPromises);
    return NextResponse.json({
      comments,
    });
  } catch (e) {
    console.log(e);
  }
}
