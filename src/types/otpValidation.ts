import { verification } from "@/constants/verification";
import { ObjectId } from "mongoose";

type Verification = (typeof verification)[number];

export interface IVerificationType {
  _id?: string;
  userId: ObjectId | string;
  verificationType: Verification;
  verificationCode: string;
  expiresAt: Date;
  attempts: number;
}
