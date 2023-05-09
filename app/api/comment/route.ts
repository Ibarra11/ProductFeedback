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
  const rawData = await req.json();
  try {
    const parsedData = replySchema.parse(rawData);

    const data = await prisma.comment.update({
      where: {
        comment_id: parsedData.commentId,
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
              content: parsedData.content,
              user_fk_id: parsedData.userId,
              post_fk_id: parsedData.postId,
              replyingTo: parsedData.replyingTo,
            },
          ],
        },
      },
    });

    return NextResponse.json({ replies: data.replies.reverse() });
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
