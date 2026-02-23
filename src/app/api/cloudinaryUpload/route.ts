import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const oldPublicId = formData.get("oldPublicId") as string | null;

    if (!file) {
      return Response.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "dream-future" }, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve({ secure_url: res?.secure_url, public_id: res?.public_id });
          }
        })
        .end(buffer);
    });

    return Response.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
}
