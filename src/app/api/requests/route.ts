import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";

export async function GET() {
  try {
    await dbConnect();
    const requests = await RequestModel.find().lean();
    return Response.json({ ok: true, requests });
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, message: "Server errorr" },
      { status: 500 },
    );
  }
}
