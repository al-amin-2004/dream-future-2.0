import { verification } from "@/constants/verification";
import { IVerificationType } from "@/types";
import mongoose, { Schema } from "mongoose";

const validationSchema = new Schema<IVerificationType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    verificationType: {
      type: String,
      enum: verification,
      default: "email",
      required: true,
    },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// for auto delete from database
validationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ValidationModel =
  (mongoose.models.Validation as mongoose.Model<IVerificationType>) ||
  mongoose.model("Validation", validationSchema);

export default ValidationModel;
