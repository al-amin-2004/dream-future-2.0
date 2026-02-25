export const requestTypes = ["deposit", "withdraw"] as const;
export const paymentMethods = [
  "bkash",
  "nagad",
  "rocket",
  "bank",
  "cash",
] as const;
export const requestStatus = ["pending", "approved", "rejected"] as const;
