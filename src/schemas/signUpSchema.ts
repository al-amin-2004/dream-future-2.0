import z from "zod";

const nameValidation = z
  .string()
  .min(1, "Name must be atleast 1 character")
  .max(20, "Name must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Name must not contain special character");

export const signUpSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation.optional(),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});
