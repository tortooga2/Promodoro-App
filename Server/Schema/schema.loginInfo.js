import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email({ message: "Invalid email format." }),
});

export const signUpSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[^A-Za-z-2-9]/, {
      message: "Password must contain at least one special character.",
    }),
  email: z.string().email({ message: "Invalid email format." }),
});
