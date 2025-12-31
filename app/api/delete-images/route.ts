"use server";

import cloudinary from "@/lib/firebase/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ids } = (await req.json()) as { ids: string[] };

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No IDs provided" },
        { status: 400 }
      );
    }

    // Delete all images in parallel
    const results = await Promise.all(
      ids.map((id) =>
        cloudinary.uploader.destroy(id).catch((err) => ({
          result: "error",
          error: err.message,
          id,
        }))
      )
    );

    // Check if any failed
    const failed = results.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.result !== "ok" && r.result !== "not found"
    );

    if (failed.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some images failed to delete",
          failed,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Images deleted successfully",
      results,
    });
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
