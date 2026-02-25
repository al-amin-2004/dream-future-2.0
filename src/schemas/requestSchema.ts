import { paymentMethods } from "@/constants/request";
import z from "zod";

export const requestSchema = z.object({
  amount: z.number().min(1, "Minimum deposit is 200"),
  month: z.string(),
  method: z.enum(paymentMethods),
  transactionId: z
    .string()
    .min(5, "Transaction ID is too short")
    .max(50, "Transaction ID too long"),
});
