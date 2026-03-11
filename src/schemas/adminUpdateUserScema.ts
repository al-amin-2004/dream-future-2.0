import z from "zod";
import { updateProfileScema } from "./updateProfileScema";

export const adminUpdateUserSchema = updateProfileScema.extend({
  email: z.string().email({ message: "Invalid email address!" }),
  username: z.string().min(5),

  avatarId: z.string().optional(),

  isVerifiedEmail: z.boolean(),
  isVerifiedNumber: z.boolean(),
});
