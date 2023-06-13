import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.newUser = token.newUser;
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === "signUp") {
        token.id = user.id;
        token.newUser = true;
        token.image = user.image;
        token.email = user.email;
        token.name = user.name;
        return token;
      } else {
        if (!user) {
          return token;
        }
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.newUser = user.newUser;
        return token;
      }
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };