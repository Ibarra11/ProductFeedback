import { Metadata } from "next";
import GoBackLink from "@/app/components/GoBackLink";
import UserAuthForm from "@/app/components/UserAuthForm";
import Link from "next/link";
export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};
export default async function Register() {
  return (
    <div className="h-full relative flex items-center justify-center">
      <div className="mx-auto flex flex-col justify-center space-y-6 rounded-md bg-brand-ghost_white p-6 shadow-md sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="heading-text-gradient text-2xl font-bold">
            Feedback Board
          </h1>
          <h1 className="text-xl">Create an account</h1>
          <p className="text-sm text-slate-600">
            Enter your email to create your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-slate-600">
          <Link
            href="/login"
            className="underline outline-none hover:text-slate-800 focus:outline-2 focus:outline-offset-1 focus:outline-slate-300"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
