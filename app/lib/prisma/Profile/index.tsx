import { prisma } from "@/db";
import { WithUserId } from "@/types";
import { ProfileFormData } from "../../zod/Profile";
type UpdateProfile = WithUserId<ProfileFormData & { newUser?: boolean }>;

export async function updateProfile(data: UpdateProfile) {
  return await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });
}
