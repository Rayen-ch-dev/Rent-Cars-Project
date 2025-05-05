"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/app/actions/auth";

export default function SignUpButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <button
        className="bg-white hover:bg-black hover:text-white transition duration-300 text-black px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Continue with Google"}
      </button>
    </form>
  );
}
