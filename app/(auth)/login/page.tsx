import { Metadata } from "next";
import GoBackLink from "@/components/GoBackLink";
import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};
export default async function Login() {
  return (
    <div className="mx-auto flex flex-col justify-center space-y-6 rounded-md bg-brand-ghost_white p-6 shadow-md sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="heading-text-gradient text-2xl font-bold">
          Feedback Board
        </h1>
        <h1 className="text-xl">Welcome back</h1>
        <p className="text-sm text-slate-600">
          Enter your email to sign in to your account
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-slate-600">
        <Link
          href="/register"
          className="underline outline-none hover:text-slate-800 focus:outline-2 focus:outline-offset-1 focus:outline-slate-300"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </p>
    </div>
  );
}
