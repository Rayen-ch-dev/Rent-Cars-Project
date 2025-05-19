"use server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { bookingSchema, loginSchema } from "./../../validations/auth";
import { login as log } from "./auth";
import { signupSchema } from "@/validations/auth";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { json } from "stream/consumers";
//sign in with google
export async function signInWithGoogle(callbackUrl: string = "/") {
  try {
    await signIn("google", {
      redirect: true,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}
//sign out
export async function logout() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}
//login
export const login = async (
  provider: string,
  Credentials: Record<"email" | "password", string>,
  options?: { redirect?: boolean }
) => {
  const result = loginSchema.safeParse(Credentials);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return {
        error: "Invalid email or password",
        status: 401,
      };
    }
    const hashedPassword = user.password;
    if (!hashedPassword) {
      return {
        error: "Invalid email or password",
        status: 401,
      };
    }
    const isPasswordCorrect = await bcrypt.compare(
      result.data.password,
      hashedPassword
    );
    if (!isPasswordCorrect) {
      return {
        error: "Invalid email or password",
        status: 401,
      };
    }
    const { password, ...userWithoutPassword } = user;
    return {
      status: 200,
      user: userWithoutPassword,
      message: "Login successful",
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};
//sign up
export const signup = async (prevState: unknown, formData: FormData) => {
  const result = signupSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
      status: 400,
    };
  }

  const { name, email, password } = result.data;

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: "Email already exists",
        status: 409,
        formData,
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      message: "Sign up successful",
      formData,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};
// get all locations
export const getLocations = async () => {
  try {
    const locations = await db.location.findMany();
    return {
      status: 200,
      body: { 
        locations: locations 
      } 
      
    };
  } catch (error) {
    console.error("Error getting locations:", error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};
//add in booking
