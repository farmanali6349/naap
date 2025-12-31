import cloudinary from "@/lib/firebase/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID not found",
        },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(id);

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        {
          success: false,
          message: "Failed To Delete Image",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Delete image error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
