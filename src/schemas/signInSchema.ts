import z from "zod";
import { passwordValidation } from "./passwordSchema";
import { emailValidation } from "./EmailSchema";

export const signinSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
