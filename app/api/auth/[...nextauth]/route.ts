import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verificationRequest } from "../VerificationRequest";

// id            String    @id @default(cuid())
//   name          String?
//   email         String?   @unique
//   emailVerified DateTime?
//   image         String?

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
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: +(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: verificationRequest,
    }),
  ],

  callbacks: {
    async signIn({ account, user }) {
      if (account && account.provider === "github") {
        const res = await fetch("https://api.github.com/user/public_emails", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        const emails: {
          primary: boolean;
          email: string;
          verified: boolean;
          visibility: string | null;
        }[] = await res.json();

        if (emails.length) {
          user.email = emails[0].email;
        }
        return true;
      }
      // for email credentials
      return true;
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image || "/user.png";
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
