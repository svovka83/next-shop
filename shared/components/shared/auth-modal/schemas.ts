import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Password must be more than 4 characters" })
  .max(14, { message: "Password must be less than 14 characters" });

export const formLoginSchema = z.object({
  email: z
    .string()
    .min(10, { message: "Email must be more than 10 characters" })
    .email({ message: "Email is invalid" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(4, { message: "Name must be more than 4 characters" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TFormLogin = z.infer<typeof formLoginSchema>;
export type TFormRegister = z.infer<typeof formRegisterSchema>;
