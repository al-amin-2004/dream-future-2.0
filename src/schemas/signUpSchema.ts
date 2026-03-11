import z from "zod";
import { nameValidation } from "./updateProfileScema";
import { passwordValidation } from "./passwordSchema";

export const signUpSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation.optional(),
  email: z.string().email({ message: "Invalid email address!" }),
  password: passwordValidation,
});
