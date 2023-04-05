"use client";
import { User } from "@prisma/client";
import React from "react";
import { Upvotes } from "@prisma/client";

type Type_User = User & {
  Upvotes: Upvotes[];
};

interface UserContext {
  user: User;
}
const UserContext = React.createContext<Type_User | undefined>(undefined);

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
}: React.PropsWithChildren<{ user: Type_User }>) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
