import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import React from "react";

export const getCurrentUser = React.cache(async () => {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }

  return session ? session.user : undefined;
});
