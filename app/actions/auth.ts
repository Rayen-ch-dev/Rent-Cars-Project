"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle() {
  try {
    await signIn("google", {
      redirect: true,
      redirectTo: "/",
      callbackUrl: "/",
    });
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}
