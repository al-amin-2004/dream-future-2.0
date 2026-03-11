import z from "zod";
import { passwordValidation } from "./passwordSchema";

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: passwordValidation,
});
