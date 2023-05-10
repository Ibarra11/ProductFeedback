import { NextResponse } from "next/server";

import { CommentRepliesSchema } from "@/app/post/helpers/zod";
import { createReply, getRepliesToComments } from "@/app/lib/prisma/comments";
import { CommentSchema } from "@/app/lib/zod";

export async function PUT(req: Request) {
  const rawData = await req.json();
  try {
    const parsedData = CommentSchema.createReply.parse(rawData);
    const replies = await createReply(parsedData);
    return NextResponse.json(replies);
  } catch (e) {
    console.log(e);
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParamIds = url.searchParams.getAll("ids").map(Number);
  try {
    const commentIds = CommentSchema.replyIds.parse(searchParamIds);

    const data = await getRepliesToComments(commentIds);
    // If there are any null comments from data, it will throw an error because an id was not found.
    const comments = CommentRepliesSchema.shape.comments.parse(data);
    return NextResponse.json({
      comments: comments,
    });
  } catch (e) {
    return NextResponse.json(
      { message: "comments not found" },
      {
        status: 404,
      }
    );
  }
}
