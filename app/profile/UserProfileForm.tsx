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

const userProfileSchema = z.object({
  image: z.string(),
  username: z.string().min(5),
  email: z.string().email(),
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
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email,
      username,
      image,
    },
  });
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formValues = watch();

  function onSubmit(data: FormData) {
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
        "grid grid-cols-2 gap-x-4 gap-y-8 max-w-3xl mx-auto ",
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
          <h4 className="text-slate-700 text-lg">Profile Picture</h4>

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
              "block text-slate-700    border border-dashed border-slate-300   rounded-md",
              "focus:outline-2 focus:outline-slate-400 focus:outline-offset-0",
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
      <div className="col-span-1 flex flex-col gap-1">
        <label htmlFor="username">Username:</label>
        <input
          className={clsx(
            "p-2 border border-slate-300 rounded outline-none",
            "focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
          )}
          id="username"
          {...register("username")}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-1">
        <label htmlFor="email">Email:</label>
        <input
          className={clsx(
            "p-2 border border-slate-300 rounded outline-none",
            "focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
          )}
          id="email"
          {...register("email")}
        />
      </div>

      <button
        className={clsx(
          "p-3 rounded-lg bg-brand-purple hover:bg-purple-700 text-brand-ghost_white text-base font-medium transition-colors outline-none",
          "focus:outline-2 focus:outline-slate-400 focus:outline-offset-2"
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
        <h5 className="text-slate-700 font-semibold text-lg b-1">
          Danger Zone
        </h5>
        <p className="text-slate-500 text-base mb-2">
          Delete this account and all the data assocaited with it.
        </p>
        <button
          type="button"
          className={clsx("text-red-500 text-sm", "hover:underline")}
        >
          Delete Account
        </button>
      </div>
    </form>
  );
}
