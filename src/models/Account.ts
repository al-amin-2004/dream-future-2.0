import { accStatus } from "@/constants/account";
import { IAccount } from "@/types/account";
import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    accName: {
      type: String,
      maxlength: [30, "Name can't be more than 30 characters."],
      required: [true, "Please provide an Account name."],
    },
    accNumber: {
      type: String,
      required: true,
      unique: true,
    },

    status: { type: String, enum: accStatus, default: "active" },

    totalDeposit: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true },
);

accountSchema.index({ userId: 1, accName: 1 }, { unique: true });

const AccountModel =
  (mongoose.models.Accounts as mongoose.Model<IAccount>) ||
  mongoose.model<IAccount>("Accounts", accountSchema);

export default AccountModel;
