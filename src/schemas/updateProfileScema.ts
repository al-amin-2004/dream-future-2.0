import { country, gender } from "@/constants/user";
import z from "zod";

export const nameValidation = z
  .string()
  .min(2, "Name must be atleast 2 character")
  .max(20, "Name must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_ ]+$/, "Name must not contain special character");

export const updateProfileScema = z.object({
  firstName: nameValidation,
  lastName: nameValidation.optional(),
  number: z.string().max(15).optional().or(z.literal("")),
  gender: z.enum(gender).optional().or(z.literal("")),
  nationality: z.enum(country).optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  birthday: z.string().optional().or(z.literal("")),
});
