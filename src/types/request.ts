import {
  requestTypes,
  paymentMethods,
  requestStatus,
} from "@/constants/request";
import { ObjectId } from "mongoose";

type RequestTypes = (typeof requestTypes)[number];
type PaymentMethods = (typeof paymentMethods)[number];
type RequestStatus = (typeof requestStatus)[number];

export interface IRequest {
  _id?: string;
  accountId: ObjectId | string;
  requestType: RequestTypes;
  month?: string;
  amount: number;
  method?: PaymentMethods;
  transactionId?: string;
  status?: RequestStatus;
  processedBy?: ObjectId | string;
  processedAt?: Date;
}
