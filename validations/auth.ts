import { sign } from '@/actions/auth';
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


const result = loginSchema.safeParse({});
export const validationErrors = !result.success ? result.error : null;