"use client";
import React from "react";
import type { User } from "@/types";

interface UserContext {
  user: User;
}
const UserContext = React.createContext<User | undefined>(undefined);

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("must be used within a UserProivder!");
  }
  return context;
}

function UserProvider({
  children,
  user,
}: React.PropsWithChildren<{ user: User | undefined }>) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
