import z from "zod";

export const passwordValidation = z
  .string()
  .min(8, { message: "Password must be atleast 8 characters" });
