import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formSchema, addPost } from "../helpers";

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const data = formSchema.parse(res);
    await addPost(data);
    return new NextResponse(null, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map(({ path, message }) => {
        return { field: path[0], message };
      });
      return new NextResponse(JSON.stringify(errors), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({
        error: "There was a problem creating a feedback post!",
      }),
      {
        status: 500,
      }
    );
  }
}
