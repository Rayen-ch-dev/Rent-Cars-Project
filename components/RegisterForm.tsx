"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      router.push("/login");
    } else if (state.status && state.status >= 400) {
      toast.error("Registration failed. Please check your input.");
    }
  }, [state]);

  return (
    <form
      action={action}
      className="w-full max-w-md mx-auto p-4  border rounded-lg shadow-lg mt-10 mb-3"
      autoComplete="off"
    >
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-1">
          <label
            htmlFor={field.name}
            className="block text-lg font-medium  text-white mb-1"
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
                onClick={() => togglePasswordVisibility()}
                className="absolute right-2 top-2"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </div>
          {state?.error?.[field.name] && (
            <p className="text-sm text-red-500 mt-2 ml-1">
              {state.error[field.name]}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full border hover:bg-white cursor-pointer hover:text-black text-white font-bold py-2 px-6 rounded-lg mt-5"
      >
        Register
      </button>
    </form>
  );
}
