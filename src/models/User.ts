import { gender, role } from "@/constants/user";
import { IUserWithPassword } from "@/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUserWithPassword>(
  {
    firstName: {
      type: String,
      maxlength: [20, "Name can't be more than 20 characters."],
      required: [true, "Please provide a name."],
    },

    lastName: {
      type: String,
      maxlength: [20, "Name can't be more than 20 characters."],
    },

    username: {
      type: String,
      required: [true, "Please provide a username."],
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Please provide a email."],
      match: [/.+\@.+\..+/, "Please use a valid email."],
    },
    isVerifiedEmail: { type: Boolean, default: false },
    password: { type: String, required: [true, "Please provide a password."] },
    number: { type: String, trim: true },
    isVerifiedNumber: { type: Boolean, default: false },
    gender: { type: String, enum: gender, default: "Male" },
    dob: Date,
    nationality: String,
    address: String,
    avatar: String,
    role: { type: String, enum: role, default: "member" },
    identification: {
      birthId: { type: String, trim: true },
      nid: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUserWithPassword>) ||
  mongoose.model<IUserWithPassword>("User", userSchema);

export default UserModel;
