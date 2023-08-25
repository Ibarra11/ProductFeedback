import { NextResponse } from "next/server";
import {
  createComment,
  createReply,
  getRepliesToComments,
} from "@/lib/prisma/Comment";
import { CommentSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { content, postId, userId } = CommentSchema.createComment.parse(data);
    await createComment({
      content,
      postId,
      userId,
    });
    return new NextResponse(null, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  const rawData = await req.json();
  try {
    const parsedData = CommentSchema.createReply.parse(rawData);
    const replies = await createReply(parsedData);
    return NextResponse.json(replies);
  } catch (e) {
    // error was a zod error either we passed invalid ids
    if (e instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid arguments" }),
        {
          status: 404,
        }
      );
    }
    if (e instanceof PrismaClientKnownRequestError) {
      return new NextResponse(e.message, {
        status: 404,
      });
    }
    // database error
    return NextResponse.json(
      { message: "Something wen't wrong please try again" },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParamIds = url.searchParams.getAll("ids").map(Number);
  try {
    const commentIds = CommentSchema.replyIds.parse(searchParamIds);

    const data = await getRepliesToComments(commentIds);
    // If there are any null comments from data, it will throw an error because an id was not found.
    const comments = CommentSchema.comments.shape.comments.parse(data);
    return NextResponse.json({
      comments,
    });
  } catch (e) {
    // error was a zod error either we passed invalid ids
    if (e instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({ message: "Comments not found" }),
        {
          status: 404,
        }
      );
    }
    // database error
    return NextResponse.json(
      { message: "Something wen't wrong please try again" },
      {
        status: 500,
      }
    );
  }
}
