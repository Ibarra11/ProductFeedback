import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    image?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
