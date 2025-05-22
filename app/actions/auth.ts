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
        locations: locations,
      },
    };
  } catch (error) {
    console.error("Error getting locations:", error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};
//add booking
export const addBooking = async (formData: FormData) => {
  try {
    const data = {
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      carId: formData.get("carId") as string,
      pickupLocationId: formData.get("pickupLocationId") as string,
      dropoffLocationId: formData.get("dropoffLocationId") as string,
      userId: formData.get("userId") as string,
    };

    const booking = await db.booking.create({
      data,
    });

    return {
      status: 201,
      body: booking,
    };
  } catch (error) {
    console.error("Error adding booking:", error);
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};

interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

export async function updateCar(formData: FormData): Promise<void> {
  const carId = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    year: parseInt(formData.get("year") as string),
    price: parseFloat(formData.get("price") as string),
    imageUrl: formData.get("imageUrl") as string,
    features: (formData.get("features") as string)
      .split(",")
      .map((f) => f.trim()),
  };

  try {
    await db.car.update({
      where: { id: carId },
      data,
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
}
export async function removeCar(carId: string): Promise<void> {
  try {
    await db.car.delete({
      where: { id: carId },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error removing car:", error);
  }
}
//get all cars
export async function getCars() {
  try {
    const cars = await db.car.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}
//add car
export async function addCar(formData: FormData): Promise<void> {
  try {
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      features: (formData.get("features") as string)
        .split(",")
        .map((f) => f.trim()),
      year: parseInt(formData.get("year") as string),
      price: parseFloat(formData.get("price") as string),
    };

    await db.car.create({
      data,
    });
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
}

// delete booking
export async function deleteBooking(formData: FormData): Promise<void> {
  try {
    const bookingId = formData.get("bookingId") as string;
    await db.booking.delete({
      where: { id: bookingId },
    });
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}
//update booking
export async function updateBooking(formData: FormData): Promise<void> {
  const bookingId = formData.get("bookingId") as string;
  const data = {
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    carId: formData.get("carId") as string,
    pickupLocationId: formData.get("pickupLocationId") as string,
    dropoffLocationId: formData.get("dropoffLocationId") as string,
    userId: formData.get("userId") as string,
  };

  try {
    await db.booking.update({
      where: { id: bookingId },
      data,
    });
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating booking:", error);
  }
}

//display booking details

// Update profile
export async function updateProfile(formData: FormData): Promise<void> {
  const userId = formData.get("userId") as string;
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  try {
    await db.user.update({
      where: { id: userId },
      data,
    });
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

// Change password
export async function changePassword(formData: FormData): Promise<void> {
  const userId = formData.get("userId") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match");
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user?.password) {
      throw new Error("User not found or no password set");
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}
