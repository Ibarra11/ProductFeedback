"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  profileFormSchema,
  ProfileFormData,
  profileFormRequestErrors,
} from "../lib/zod/Profile";
import clsx from "clsx";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import { refreshSession } from "../lib/hooks/Auth";
import { ImSpinner8 } from "react-icons/im";

type UserProfileFormProps = React.HTMLAttributes<HTMLFormElement> &
  Partial<ProfileFormData>;
function getDirtyValues(
  formData: ProfileFormData,
  dirtyFields: Partial<
    Readonly<{
      [K in keyof ProfileFormData]?: boolean;
    }>
  >
) {
  return Object.keys(dirtyFields).reduce((acc, curr) => {
    return { ...acc, [curr]: formData[curr as keyof ProfileFormData] };
  }, {} as ProfileFormData);
}

export default function UserProfileForm({
  className,
  image,
  name,
  email,
  ...props
}: UserProfileFormProps) {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,

    formState: { errors, isDirty, dirtyFields },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email,
      name,
      image,
    },
  });
  const router = useRouter();

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValues = watch();
  //
  async function onSubmit(data: ProfileFormData, e?: React.BaseSyntheticEvent) {
    e?.preventDefault();
    setIsSubmitting(true);
    const dirtyFieldValues = getDirtyValues(data, dirtyFields);
    console.log(dirtyFields);
    console.log(dirtyFieldValues);
    // setIsLoading(true);
    try {
      const result = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(dirtyFieldValues),
      });

      if (!result.ok) {
        // validation error
        if (result.status === 400) {
          const raw = await result.json();
          const {
            errors: { name, email },
          } = profileFormRequestErrors.parse(raw);
          if (name) {
            setError(
              "name",
              { type: "focus", message: name },
              { shouldFocus: true }
            );
          }
          if (email) {
            setError(
              "email",
              { type: "fopcus", message: email },
              { shouldFocus: true }
            );
          }
        }
      } else {
        // I am going to update the session after the user completes the onboarding process.  Essentially, I have a property on the session token called newUser, which is set to true by default.  When the user completes the form, I will change it to false and they can go to other pages in the app.
        await refreshSession();
        router.push("/");
      }
    } catch (e) {
      clearErrors();
    } finally {
      setIsSubmitting(false);
    }
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
                setValue("image", imageSrc, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
          />
          <label
            className={clsx(
              "block rounded-md    border border-dashed border-slate-300   text-slate-700",
              "outline-none focus:outline-2 focus:outline-offset-0 focus:outline-slate-400",
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
        <label htmlFor="name">
          Username<span className="text-red-500">*</span>
        </label>
        <input
          className={clsx(
            "rounded border border-slate-300 p-2 outline-none",
            !errors.name &&
              "focus:outline-2 focus:outline-offset-0 focus:outline-slate-400",
            errors.name && "border-red-500 text-red-500  focus:outline-red-500"
          )}
          type="text"
          id="name"
          aria-invalid={errors.name ? true : false}
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className={clsx(`col-span-1 flex flex-col gap-1 text-slate-700`)}>
        <label htmlFor="email">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={clsx(
            "rounded border border-slate-300 p-2 outline-none ring-0",
            !errors.email &&
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
          "inline-flex items-center justify-center rounded-lg bg-brand-purple p-3 text-base font-medium text-brand-ghost_white outline-none transition-all duration-200 ",
          "focus:outline-2 focus:outline-offset-2 focus:outline-slate-400",
          isDirty && "hover:bg-purple-700",
          !isDirty && "opacity-50"
        )}
        disabled={!isDirty || isSubmitting}
      >
        <div className="relative">
          {isSubmitting && (
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full">
              <ImSpinner8 className="  h-4 w-4 animate-spin" />
            </span>
          )}
          Update Profile
        </div>
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
