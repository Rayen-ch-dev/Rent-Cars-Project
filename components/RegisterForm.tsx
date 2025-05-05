"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter(); 

  const initialState: {
    message?: string;
    error?: any;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData: null,
  };

  const { getFormFields } = useFormFields({ slug: "register" });
  const [state, action] = useActionState(signup, initialState);

  useEffect(() => {
    if (state.status === 201 && state.message) {
      toast.success(state.message); 
      router.push("/LogIn");
    } else if (state.status && state.status >= 400) {
      toast.error("Registration failed. Please check your input.");
    }
  }, [state]);

  return (
    <form
      action={action}
      className="w-full max-w-sm"
      autoComplete="off"
    >
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {state?.error?.[field.name] && (
            <p className="text-sm text-red-500 mt-1">
              {state.error[field.name]}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
      >
        Register
      </button>
    </form>
  );
}
