import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

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

    // Admin guard
    if (decoded.role !== "admin") {
      return Response.json(
        { ok: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const accounts = await AccountModel.find().lean();

    return Response.json({ ok: true, accounts });
  } catch (error) {
    console.error("account api route error", error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
