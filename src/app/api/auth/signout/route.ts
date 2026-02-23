import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");

    return Response.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Logout failed" },
      { status: 500 },
    );
  }
}
