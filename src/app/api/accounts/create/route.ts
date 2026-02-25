// ***** Code flow this page ******* \\
// 1. Get token from cookie
// 2. Decode token
// 3. Get Account name from POST request
// 4. Trimed Account Name
// 5. Check existing Account Name this user
// 6. Generate account number from helper
// 7. Create account in Database

import { generateAccountNumber } from "@/helpers/generateAccountNumber";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        { ok: false, message: "No auth token" },
        { status: 401 },
      );
    }

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    const { accName } = await request.json();
    if (!accName.trim()) {
      return Response.json({ message: "Missing data" }, { status: 400 });
    }

    const trimedName = accName.trim();

    const existingAccName = await AccountModel.findOne({
      userId: decode.userId,
      accName: trimedName,
    });
    if (existingAccName) {
      return Response.json(
        { message: "This account name already exists" },
        { status: 400 },
      );
    }

    const accNumber = await generateAccountNumber();

    // Create new Account
    await AccountModel.create({
      userId: decode.userId,
      accName: trimedName,
      accNumber,
    });

    return Response.json(
      { message: "Account create successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
