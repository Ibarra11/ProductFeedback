"use client";
import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

type ValidationSchema<T> = z.ZodObject<{ [K in keyof T]: z.ZodType<T[K]> }>;

interface FormState<T> {
  formValues: T;
  validation: ValidationSchema<T>;
  fetchConfig: {
    url: string;
    data: Record<string, any>;
    onSuccessRedirect: string;
  };
}

type FormStatus =
  | "idle"
  | "pending"
  | "formValidationError"
  | "formRequestError";

type FormReturn<T> = (
  | {
      status: "idle";
    }
  | {
      status: "formValidationError";
      errors: {
        [K in keyof T]?: { message: string };
      };
    }
  | {
      status: "formRequestError";
      error: {
        message: string;
      };
    }
  | {
      status: "pending";
    }
) & {
  formData: T;
  setFormData: (values: Partial<T>) => void;
  handleFormSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
};

export default function useFormState<T>({
  formValues,
  validation,
  fetchConfig,
}: FormState<T>): FormReturn<T> {
  const initialFormState = React.useRef<T>(formValues);
  const [formData, setData] = React.useState(formValues);
  const [status, setFormStatus] = React.useState<FormStatus>("idle");
  const [formValidationErrors, setFormValidationErrors] = React.useState<{
    [K in keyof T]: { message: string };
  }>({} as any);
  const [formRequestError, setFormRequestError] = React.useState("");
  const router = useRouter();

  function setFormData(newFormValues: Partial<T>) {
    setData({ ...formData, ...newFormValues });
  }

  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setFormStatus("pending");
    const result = validation.safeParse(formData);
    if (!result.success) {
      setFormStatus("formValidationError");
      let errors: { [K in keyof T]: { message: string } } = {} as any;
      for (const issue of result.error.issues) {
        errors[issue.path[0] as keyof T] = {
          message: issue.message,
        };
      }
      setFormValidationErrors(errors);
      return;
    }
    const res = await fetch(fetchConfig.url, {
      method: "POST",
      body: JSON.stringify({ ...formData, ...fetchConfig.data }),
    });
    if (!res.ok) {
      setFormStatus("formRequestError");
      setFormRequestError("Form could not be submitted please try again");
    } else {
      setFormStatus("idle");
      setFormData(initialFormState.current);
      //@ts-ignore
      router.push(fetchConfig.onSuccessRedirect);
    }
  }
  if (status === "formValidationError") {
    return {
      status,
      errors: formValidationErrors,
      handleFormSubmit,
      formData,
      setFormData,
    };
  } else if (status === "formRequestError") {
    return {
      status,
      error: {
        message: formRequestError,
      },
      handleFormSubmit,
      formData,
      setFormData,
    };
  } else {
    return { status, handleFormSubmit, formData, setFormData };
  }
}
