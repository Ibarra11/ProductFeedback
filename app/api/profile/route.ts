import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { profileFormSchema } from "@/app/lib/zod/Profile";
import { updateProfile } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  try {
    const { user } = session;
    const rawData = await req.json();
    const data = profileFormSchema.parse(rawData);
    if (user.newUser) {
      const result = await updateProfile({
        ...data,
        userId: user.id,
        newUser: false,
      });
      user.newUser = result.newUser;
      user.email = result.email;
      user.name = result.name;
      user.image = result.image;
    } else {
      await updateProfile({ ...data, userId: user.id });
    }
    console.log(user);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.log(e);
    return new NextResponse(null, { status: 500 });
  }
}
