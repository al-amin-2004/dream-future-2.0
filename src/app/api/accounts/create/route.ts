// ***** Code flow this page ******* \\
// 1. Get decoded form getAuthUserId
// 2. Get Account name from POST request
// 3. Trimed Account Name
// 4. Check existing Account Name this user
// 5. Generate account number from helper
// 6. Create account in Database

import { generateAccountNumber } from "@/helpers/generateAccountNumber";
import { getAuthUserId } from "@/helpers/getUserId";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const auth = await getAuthUserId();
    if (!auth.ok) {
      return Response.json(
        { ok: false, message: auth.message },
        { status: auth.status },
      );
    }

    const { accName } = await request.json();
    if (!accName.trim()) {
      return Response.json({ message: "Missing data" }, { status: 400 });
    }

    const trimedName = accName.trim();

    const existingAccName = await AccountModel.findOne({
      userId: auth.decode?.userId,
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
      userId: auth.decode?.userId,
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
