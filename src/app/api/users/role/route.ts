import { role } from "@/constants/user";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PUT(request: Request) {
  try {
    await dbConnect();

    /* ================= Admin AUTH ================= */
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      role: string;
    };
    if (decoded.role !== "admin") {
      return Response.json(
        { ok: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    // ===== Basic input validation =====
    const { memberId, newRole } = await request.json();
    if (!memberId || !newRole) {
      return Response.json(
        { ok: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!role.includes(newRole)) {
      return Response.json(
        { ok: false, message: "Invalid role" },
        { status: 400 },
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      memberId,
      { $set: { role: newRole } },
      { returnDocument: "after" },
    );

    if (!updatedUser)
      return Response.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );

    return Response.json(
      { ok: true, message: "Role change successfully.", updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, message: "Server error" },
      { status: 500 },
    );
  }
}
