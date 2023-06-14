import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { profileFormSchema } from "@/app/lib/zod/Profile";
import { updateProfile } from "@/app/lib/prisma";
import { getUser } from "@/app/lib/prisma";
import * as crypto from "crypto";

const CLOUDINARY_ENDPOINT = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`;
// `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
//   secure: true,
// });

function generateHash(str: string) {
  return crypto.createHash("sha1").update(str).digest("hex");
}

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

    if (data.image) {
      const formData = new FormData();
      const timestamp = String(Math.round(new Date().getTime() / 1000));
      const public_id = `Avatar-${user.id}`;

      formData.append("file", data.image);
      formData.append("api_key", process.env.CLOUD_API_KEY!);
      formData.append("public_id", public_id);
      formData.append("folder", "avatars");
      formData.append("timestamp", timestamp);
      const hashString = [...formData.entries()]
        .slice(2)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join("&")
        .concat(process.env.CLOUD_API_SECRET!);

      const signature = generateHash(hashString);
      formData.append("signature", signature);
      const res = await fetch(CLOUDINARY_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      data.image = result.secure_url;
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
