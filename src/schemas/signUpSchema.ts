import z from "zod";
import { nameValidation } from "./updateProfileScema";
import { passwordValidation } from "./passwordSchema";
import { emailValidation } from "./EmailSchema";

export const signUpSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation.optional(),
  email: emailValidation,
  password: passwordValidation,
});
