import { prisma } from "@/db";
import { WithUserId } from "@/types";
import { ProfileFormData } from "../../zod/Profile";
type UpdateProfile = WithUserId<ProfileFormData & { newUser?: boolean }>;

export async function updateProfile(data: UpdateProfile) {
  return await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      id: data.userId,
      email: data.email,
      name: data.username,
      image: data.image,
      newUser: data.newUser,
    },
  });
}
