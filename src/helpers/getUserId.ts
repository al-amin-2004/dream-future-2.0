import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type DecodedToken = JwtPayload & { userId: string };

export async function getAuthUserId() {
  // Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return { ok: false, status: 401, message: "Authentication token missing" };
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return { ok: true, decode };
  } catch (error) {
    console.error(error);
    return { ok: false, status: 401, message: "Invalid auth token" };
  }
}
