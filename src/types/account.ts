import { accStatus } from "@/constants/account";
import { ObjectId } from "mongoose";

type Status = (typeof accStatus)[number];

export interface IAccount {
  _id?: string;
  userId: ObjectId | string;
  accName: string;
  accNumber: string;
  status: Status;
  totalDeposit: number;
  totalProfit: number;
  balance: number;
}
