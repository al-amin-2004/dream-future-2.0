import mongoose from "mongoose";

let isDbConnected = false;
const URI = (process.env.MONGODB_URI || "") as string;

const dbConnect = async (): Promise<void> => {
  if (isDbConnected) return;

  try {
    mongoose.connect(URI, { dbName: "Dream-Future" });
    isDbConnected = true;
  } catch (error) {
    console.error("DB connection error!, the error is:", error);
    process.exit(1);
  }
};

export default dbConnect;
