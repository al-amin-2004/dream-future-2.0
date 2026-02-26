import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { accountId } = await request.json();

    const requests = await RequestModel.find({ accountId: accountId, status: "pending" })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      { success: true,requests, message: "Pending request getting successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    Response.json(
      { success: false, message: "Server errorr" },
      { status: 500 },
    );
  }
}
