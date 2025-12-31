import cloudinary from "@/lib/firebase/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images");

    // Check if files are empty
    if (!files.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No Image Received",
        },
        { status: 400 }
      );
    }

    const uploads = files.map(async (file) => {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "tailor-shop" }, (err, result) => {
              if (err) {
                reject(err);
              }

              resolve({
                id: result?.public_id,
                url: result?.secure_url,
              });
            })
            .end(buffer);
        });
      } else {
        throw new Error("Invalid File Type Received");
      }
    });

    const results = (await Promise.all(uploads)) as {
      id: string;
      url: string;
    }[];

    return NextResponse.json(
      {
        success: true,
        message: "Images Uploaded Successfully",
        images: results,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
        message: "SERVER SIDE ERROR",
      },
      { status: 500 }
    );
  }
}
