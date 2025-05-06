"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SignUpButton from "@/components/SignUpButtonGoogle";
import { Eye, EyeOff } from "lucide-react";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState({});

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
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
    <div className="w-full max-w-md mx-auto p-4 border border-white rounded-lg shadow-lg mt-10 mb-3">
      <form onSubmit={onSubmit} ref={formRef} autoComplete="off">
        {getFormFields().map((field: IFormField) => (
          <div key={field.name} className="mb-1">
            <label
              htmlFor={field.name}
              className="block text-lg font-medium text-white mb-1"
            >
              {field.label}
            </label>
            <div className="relative">
              <input
                type={
                  field.type === "password" && showPassword
                    ? "text"
                    : field.type
                }
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                className="block w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {field.type === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-2 ml-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full border hover:bg-white cursor-pointer hover:text-black text-white font-bold py-2 px-6 rounded-lg mt-5"
          disabled={isLoading}
        >
          {isLoading ? "Signing in ..." : "Sign in"}
        </button>

        <div className="flex justify-center mt-4 text-white">
          --------------OR---------------
        </div>
      </form>
      <div className="flex justify-center mt-3">
        <SignUpButton />
      </div>
    </div>
  );
};

export default LoginForm;
