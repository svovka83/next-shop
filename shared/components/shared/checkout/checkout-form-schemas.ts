import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: "First name must be at least 4 characters long" })
    .max(14, { message: "First name must be at most 14 characters long" }),
  lastName: z
    .string()
    .min(4, { message: "First name must be at least 4 characters long" })
    .max(14, { message: "First name must be at most 14 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 10 characters long" }),
  comment: z.string().optional(),
});
