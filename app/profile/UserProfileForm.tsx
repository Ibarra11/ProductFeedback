"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/app/lib/zod/Auth";
import { z } from "zod";
import clsx from "clsx";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import LoadingCircle from "../components/LoadingCircle";
import { IoMdWarning } from "react-icons/io";

const userProfileSchema = z.object({
  image: z.string(),
  username: z.string().refine((val) => {
    return /^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(val);
  }, "Your username should be between 5 & 15 characters long and must start with a letter followed by letters, numbers, or _."),
  email: z.string().email("Please enter a valid email address!"),
});

type UserProfileFormProps = React.HTMLAttributes<HTMLFormElement> &
  Partial<FormData>;

type FormData = z.infer<typeof userProfileSchema>;

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
  } = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      email,
      username,
      image,
    },
  });
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formValues = watch();
  console.log(formValues);

  console.log(errors);

  function onSubmit(data: FormData) {
    console.log("test");
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    console.log(data);
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
