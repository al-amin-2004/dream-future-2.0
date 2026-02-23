import z from "zod";
import { nameValidation } from "./updateProfileScema";

export const signUpSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation.optional(),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});
