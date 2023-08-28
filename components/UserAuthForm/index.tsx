"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/zod/Auth";
import { z } from "zod";
import clsx from "clsx";
import { FaGithub } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "../ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof userAuthSchema>;

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const searchParams = useSearchParams();
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={clsx("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-brand-american_blue px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-american_blue/90 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading && <span className="mr-2">...</span>}
            {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-lg border  px-5 py-2.5 text-center text-sm font-medium  text-slate-700  hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-50"
        onClick={() => {
          setIsGithubLoading(true);
          signIn("github");
        }}
        disabled={isLoading}
      >
        {isGithubLoading ? (
          <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}
        Github
      </button>
    </div>
  );
}
