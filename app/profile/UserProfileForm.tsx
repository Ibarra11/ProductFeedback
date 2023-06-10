"use client";
import { useState, useRef, BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { profileFormSchema, ProfileFormData } from "../lib/zod/Profile";
import clsx from "clsx";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import LoadingCircle from "../components/LoadingCircle";
import { IoMdWarning } from "react-icons/io";

type UserProfileFormProps = React.HTMLAttributes<HTMLFormElement> &
  Partial<ProfileFormData>;

export default function UserProfileForm({
  className,
  image,
  username,
  email,
  ...props
}: UserProfileFormProps) {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email,
      username,
      image,
    },
  });
  const router = useRouter();
  // I am going to update the session after the user completes the onboarding process.  Essentially, I have a property on the session token called newUser, which is set to true by default.  When the user completes the form, I will change it to false and they can go to other pages in the app.

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formValues = watch();
  //
  async function onSubmit(data: ProfileFormData, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    setIsLoading(true);
    try {
      await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      // refresh the session because I have updated some info in the db
      await fetch("/api/auth/session");
      router.push("/");
    } catch (e) {
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "mx-auto grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8 ",
        className
      )}
    >
      <div className="col-span-2  flex gap-4">
        <Image
          className="object-cover"
          src={formValues.image ?? "/user.png"}
          alt="user profile"
          width={100}
          height={100}
        />
        <div className="space-y-2">
          <h4 className="text-lg text-slate-700">Profile Picture</h4>

          <input
            type="file"
            id="upload"
            className="hidden"
            accept="image/*"
            {...register("image")}
            ref={fileUploadRef}
            onChange={(e) => {
              if (e.target.files) {
                const imageSrc = URL.createObjectURL(e.target.files[0]);
                setValue("image", imageSrc, { shouldValidate: true });
              }
            }}
          />
          <label
            className={clsx(
              "block rounded-md    border border-dashed border-slate-300   text-slate-700",
              "focus:outline-2 focus:outline-offset-0 focus:outline-slate-400",
              "hover:bg-slate-50"
            )}
            htmlFor="upload"
          >
            <span
              onKeyUp={(e) => {
                if (e.code === "Enter" || e.code === "Space") {
                  fileUploadRef.current?.click();
                }
              }}
              className="inline-flex items-center  gap-1 px-2 py-3"
              role="button"
              aria-controls="filename"
              // @ts-ignore
              tabIndex="0"
            >
              Update image
              <FiUpload size={16} aria-hidden="true" />
            </span>
          </label>
        </div>
      </div>
      <div className={clsx(`col-span-1 flex flex-col gap-1`, "text-slate-700")}>
        <label htmlFor="username">
          Username<span className="text-red-500">*</span>
        </label>
        <input
          className={clsx(
            "rounded border border-slate-300 p-2 outline-none",
            "focus:outline-2 focus:outline-offset-0 focus:outline-slate-400",
            errors.username &&
              "border-red-500 text-red-500  focus:outline-red-500"
          )}
          type="text"
          id="username"
          aria-invalid={errors.username ? true : false}
          {...register("username")}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div className={clsx(`col-span-1 flex flex-col gap-1 text-slate-700`)}>
        <label htmlFor="email">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={clsx(
            "rounded border border-slate-300 p-2 outline-none",
            "focus:outline-2 focus:outline-offset-0 focus:outline-slate-400",
            errors.email && "border-red-500 text-red-500  focus:outline-red-500"
          )}
          aria-invalid={errors.email ? true : false}
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <button
        className={clsx(
          "rounded-lg bg-brand-purple p-3 text-base font-medium text-brand-ghost_white outline-none transition-colors hover:bg-purple-700",
          "focus:outline-2 focus:outline-offset-2 focus:outline-slate-400"
        )}
      >
        Update Profile
        {isLoading && (
          <span className="relative ">
            <LoadingCircle size="sm" color="secondary" />
          </span>
        )}
      </button>

      <div className="col-span-2">
        <h5 className="b-1 text-lg font-semibold text-slate-700">
          Danger Zone
        </h5>
        <p className="mb-2 text-base text-slate-500">
          Delete this account and all the data assocaited with it.
        </p>
        <button
          type="button"
          className={clsx("text-sm text-red-500", "hover:underline")}
        >
          Delete Account
        </button>
      </div>
    </form>
  );
}
