import { NextResponse } from "next/server";
import { addCommentSchema } from "../../helpers";
import { prisma } from "@/db";

export async function POST(req: Request) {
  console.log("test post api");
  try {
    const data = await req.json();
    const { content, post_fk_id } = addCommentSchema.parse(data);
    const users = await prisma.user.findMany();
    const randomUserIndex = Math.floor(Math.random() * users.length);
    await prisma.comment.create({
      data: {
        content,
        post_fk_id,
        user_fk_id: users[randomUserIndex].user_id,
      },
    });
    return new NextResponse(null, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, {
      status: 500,
    });
  }
}
