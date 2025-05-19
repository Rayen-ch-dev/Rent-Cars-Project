
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
  .string({
    message: "Password is required",
  })
  .min(8, {
    message: "Password must be at least 8 characters",
  })
  .max(32, {
    message: "Password must be less than 32 characters",
  })
  ,

});

export const signupSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(32, {
        message: "Password must be less than 32 characters",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(32, {
        message: "Password must be less than 32 characters",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });


  export const bookingSchema = z.object({
    startDate: z.coerce.date({ required_error: "Start date is required" }),
    endDate: z.coerce.date({ required_error: "End date is required" }),
    carId: z.string({ required_error: "Car ID is required" }),
    pickupLocationId: z.string({ required_error: "Pickup location ID is required" }),
    dropoffLocationId: z.string({ required_error: "Dropoff location ID is required" }),
    totalPrice: z.number({ required_error: "Total price is required" }),
  }).refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  }).refine((data) => {
    const diffInDays = (data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 30;
  }, {
    message: "The range must be 30 days or less",
    path: ["endDate"],
  }).refine((data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.startDate >= today;
  }, {
    message: "Start date cannot be in the past",
    path: ["startDate"],
  }).refine((data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.endDate >= today;
  }, {
    message: "End date cannot be in the past",
    path: ["endDate"],
  });
const result = loginSchema.safeParse({});
export const validationErrors = !result.success ? result.error : null;
