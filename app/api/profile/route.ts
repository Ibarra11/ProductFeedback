import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { profileFormSchema } from "@/app/lib/zod/Profile";
import { updateProfile } from "@/app/lib/prisma";
import { getUser } from "@/app/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  try {
    const { user } = session;
    const rawData = await req.json();
    const data = profileFormSchema.parse(rawData);
    const dbUser = await getUser(user.id);
    if (!dbUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    let errors: Record<keyof typeof data, string> = {} as any;
    if (dbUser.email === data.email) {
      errors.email = "Email already exist!";
    }
    if (dbUser.name === data.name) {
      errors.name = "Username already exist!";
    }
    if ("name" in errors || "email" in errors) {
      return new NextResponse(JSON.stringify({ errors: errors }), {
        status: 400,
      });
    }

    if (user.newUser) {
      const result = await updateProfile({
        ...data,
        id: user.id,
        newUser: false,
      });
    } else {
      await updateProfile({ ...data, id: user.id });
    }
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.log(e);
    return new NextResponse(null, { status: 500 });
  }
}
