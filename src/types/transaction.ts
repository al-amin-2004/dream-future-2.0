import { ObjectId } from "mongoose";
import { paymentMethods, requestTypes } from "@/constants/request";

type RequestTypes = (typeof requestTypes)[number];
type PaymentMethods = (typeof paymentMethods)[number];

export interface ITransaction {
  _id?: string;
  accountId: ObjectId | string;
  requestId: ObjectId | string;
  transactionType: RequestTypes;
  amount: number;
  method?: PaymentMethods;
  month?: string;
  transactionId?: string;
  transactionDate: Date;
  requestDate: Date;
  newBalance: number;
  profitSource?: string;
  processedBy: ObjectId | string;
}
