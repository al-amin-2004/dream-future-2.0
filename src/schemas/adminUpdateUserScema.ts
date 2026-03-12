import z from "zod";
import { updateProfileScema } from "./updateProfileScema";
import { emailValidation } from "./EmailSchema";

export const adminUpdateUserSchema = updateProfileScema.extend({
  email: emailValidation,
  username: z.string().min(5),

  avatarId: z.string().optional(),

  isVerifiedEmail: z.boolean(),
  isVerifiedNumber: z.boolean(),
});
