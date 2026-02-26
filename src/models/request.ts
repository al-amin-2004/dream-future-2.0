import {
  paymentMethods,
  requestStatus,
  requestTypes,
} from "@/constants/request";
import { IRequest } from "@/types";
import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema<IRequest>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    requestType: { type: String, enum: requestTypes, default: "deposit", required: true },
    month: { type: String },
    amount: { type: Number, required: true, min: 1 },
    method: { type: String, enum: paymentMethods, default: "bkash" },
    transactionId: {
      type: String,
      required: function (this: IRequest) {
        return this.method !== "cash";
      },
    },
    status: { type: String, enum: requestStatus, default: "pending" },
    processedBy: { type: Schema.Types.ObjectId, ref: "User" },
    processedAt: { type: Date },
  },
  { timestamps: true },
);

requestSchema.index({ transactionId: 1 }, { unique: true, sparse: true });

const RequestModel =
  (mongoose.models.Request as mongoose.Model<IRequest>) ||
  mongoose.model<IRequest>("Request", requestSchema);

export default RequestModel;
