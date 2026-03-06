import { paymentMethods, requestTypes } from "@/constants/request";
import { ITransaction } from "@/types";
import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema<ITransaction>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    requestId: { type: Schema.Types.ObjectId, ref: "Request", required: true },
    transactionType: { type: String, enum: requestTypes, required: true },
    month: { type: String },
    amount: { type: Number, required: true, min: 1 },
    method: { type: String, enum: paymentMethods },
    transactionDate: { type: Date, default: Date.now },
    newBalance: { type: Number, required: true },
    profitSource: { type: String, default: "" },
    processedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const TransactionModel =
  (mongoose.models.Transaction as mongoose.Model<ITransaction>) ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);

export default TransactionModel;
