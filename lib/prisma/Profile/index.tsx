import { prisma } from "@/db";
import { WithUserId } from "@/types";
import { ProfileFormData } from "../../zod/Profile";
type UpdateProfile = WithUserId<ProfileFormData>;

export async function updateProfile(data: UpdateProfile) {
  return await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      ...data,
    },
  });
}

export async function deleteAccount(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
