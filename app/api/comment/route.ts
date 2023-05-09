import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/db";

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

    const replies = await prisma.comment.update({
      where: {
        comment_id: data.commentId,
      },
      select: {
        replies: {
          select: {
            comment_id: true,
          },
        },
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
    console.log(replies);
    return NextResponse.json(replies);
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
