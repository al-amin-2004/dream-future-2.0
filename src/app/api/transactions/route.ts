import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import TransactionModel from "@/models/Transaction";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return Response.json({ ok: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      role: string;
    };

    // Admin and Treasurer guard
    if (decoded.role !== "admin" && decoded.role !== "treasurer") {
      return Response.json(
        { ok: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const transactions = await TransactionModel.find().lean();

    return Response.json({ ok: true, transactions });
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, message: "Server errorr" },
      { status: 500 },
    );
  }
}
