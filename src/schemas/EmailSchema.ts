import z from "zod";

export const emailValidation = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email");
