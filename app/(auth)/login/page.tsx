import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import LinkWithChevronLeft from "@/app/components/LinkWithChevronLeft";
import UserAuthForm from "@/app/components/UserAuthForm";
import Link from "next/link";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};
export default async function Login() {
  const session = await getServerSession(authOptions);
  //   if (session) {
  //     redirect("/");
  //   }
  return (
    <div className="relative flex items-center justify-center h-full`">
      <LinkWithChevronLeft className="absolute top-0 left-0">
        Back
      </LinkWithChevronLeft>
      <div className="sm:w-[350px] p-6 rounded-md shadow-sm mx-auto flex flex-col justify-center space-y-6 bg-brand-ghost_white">
        <div className="flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-bold heading-text-gradient">
            Feedback Board
          </h1>
          <h1 className="text-xl">Welcome back</h1>
          <p className="text-sm text-slate-600">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-slate-600">
          <Link href="/register" className="underline hover:text-brand">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
