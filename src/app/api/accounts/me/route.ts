// ***** Code flow this page ******* \\
// 1. Get token from cookie
// 2. Decode token
// 3. Get Accounts from database

import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };
    
    const accounts = await AccountModel.find({ userId: decoded.userId })
      .sort({ createdAt: 1 })
      .lean();

    if (accounts.length === 0) {
      return Response.json(
        { ok: false, message: "account not found" },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, accounts });
  } catch (error) {
    console.error("accounts route error:", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
