"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({ slug: "login" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if(res?.error){
        toast.error("Invalid email or password");
      }else{
        toast.success("Login successful");
        router.push("/");
        router.refresh();

      }

     
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Something went wrong");
      setErrors({
        email: "Invalid email",
        password: "Incorrect password",
      });
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
          {errors[field.name] && (
            <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
          )}
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
