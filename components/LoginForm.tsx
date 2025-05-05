"use client";
import React from "react";
import { useState } from "react";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { useRef } from "react";
import { toast } from "sonner";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({ slug: "login" });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      setIsLoading(true);
      const res = await login("credentials", {
        email: data.email,
        password: data.password,
      }, { 
        redirect: true 
      });

      if (res?.error) {
        /*
            try {
              const parsedError = JSON.parse(res.error);
              console.log("Response error:", parsedError.responseError);
      
              if (parsedError.validationErrors) {
                parsedError.validationErrors.forEach((error: any) => {
                  const field = getFormFields().find(f => f.name === error.path[0]);
                  if (field) field.error = error.message;
                });
              }
            } catch (jsonError) {
              console.error("Login failed (non-JSON error):", res.error);
            }*/

              toast.error("Invalid email or password", {
                duration: 3000,
              });
        return;
      }
      if (res.status === 200) {
        toast.error("login successful", {
          duration: 3000,
          
          
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
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
        </div>
      ))}
      <button
        type="submit"
        className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={isLoading}
      >
        {isLoading ? "Signing in ..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
