"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";

export default function SignUpButton() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithGoogle(callbackUrl);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <button
        className="w-full border bg-white cursor-pointer text-black mt-4 hover:text-white hover:bg-black font-bold py-2 px-8  rounded-lg "
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Continue with Google"}
      </button>
    </form>
  );
}
