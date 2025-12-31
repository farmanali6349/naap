"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import axios from "axios";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Lucid React Icons
import { Images, Upload } from "lucide-react";

import { useParams } from "next/navigation";
import { useAuth } from "@/app/_contexts/Auth";

// -- Configuration --
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_COUNT = 3;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// --- Zod Schema ---
const uploadSchema = z.object({
  images: z
    .any()
    .refine((files) => files?.length > 0, "Please select at least one image.")
    .refine(
      (files) => files?.length <= MAX_IMAGE_COUNT,
      "You can upload a maximum of 3 images."
    )
    .transform((files) => Array.from(files as FileList))
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      "Each image must be less than 5MB."
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .png, and .webp formats are supported."
    ),
});

// Types
import { ImageDoc, ImageUploadResponse } from "@/lib/types";
import { createImages } from "@/lib/firebase/db";
import Loader from "../Loader";

type UploadFormData = z.infer<typeof uploadSchema>;

// Form
export default function UploadImagesForm({
  loadImages,
  noOfImages,
}: {
  loadImages: (updatedImages: ImageDoc[]) => void;
  noOfImages: number;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const params = useParams();
  const { user } = useAuth();
  const naapId = params.id as "string";
  const userId = user?.uid as "string";

  // Image Qouta (User can upload maximum 03 Images)
  const imageQouta = 3 - noOfImages;

  // Code To See The Input Change
  // - File Previews
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState(0);
  const { onChange } = register("images");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Generate preview URLs
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
      setFileCount(files ? files.length : 0);
    }
    onChange(e);
  };

  const uploadImages = async (formData: FormData) => {
    try {
      const res = await axios.post("/api/upload-images", formData);
      const data = res.data as ImageUploadResponse;
      if (data.success) {
        return data.images || null;
      } else {
        return null;
      }
    } catch (error) {
      toast.error("Failed to Upload Image");
      console.error("Upload failed", error);
      return null;
    }
  };

  const registerImages = async (
    images: {
      cloudinaryId: string;
      url: string;
    }[]
  ) => {
    try {
      // Store Images In Database
      const res = await createImages(userId, naapId, images);
      if (res) {
        loadImages(res);
      }
      return res;
    } catch (error) {
      toast.error("Error Storing Image Data In Database");
      console.log("Error occured in registering images :: ", error);
      return null;
    }
  };

  const uploadAndRegister = async (formData: FormData) => {
    // Upload Images
    const images = await uploadImages(formData);

    // Register Image
    if (images) {
      console.log("Image Uploaded Successfullly.");
      // Images Uploaded - Register In Database
      const formatedImgs = images.map((img) => {
        return { cloudinaryId: img.id, url: img.url };
      });
      const regImgs = await registerImages(formatedImgs);

      if (!regImgs) {
        return console.log("Error Registering Images");
      }

      toast.success("Image uploaded successfully");
      // Redirect To Page
    } else {
      // Image Upload Failed
      toast.error("Failed to Upload Image");
      console.log("Could not be able to upload Images");
    }
  };

  const onSubmit = async (data: UploadFormData) => {
    // Formate Images Data
    const formData = new FormData();

    data.images.forEach((img) => {
      formData.append("images", img);
    });

    // Upload And Register
    await uploadAndRegister(formData);
    reset();
    setPreviews([]);
    setFileCount(0);
  };

  if (isSubmitting) {
    return <Loader text="Uploading Images" />;
  }

  if (imageQouta <= 0) {
    return (
      <p className="mt-2 text-red-500">
        IMAGE QUOTA for this naap is completed. You can upload maximum 03 images
        per Naap.
      </p>
    );
  }

  return (
    <div className="w-full mx-auto border rounded-md mt-2 shadow-sm">
      {/* Real Images As Image Previews But With Controls & Loading */}
      {/* Image Prviews */}
      {previews.length > 0 && (
        <div className="w-full h-full">
          {previews.map((prev, ind) => (
            <div className="w-full h-full relative" key={ind}>
              <span className="absolute top-4 right-4 z-5">
                <Badge>Preview</Badge>
              </span>
              <Image
                src={prev}
                width={400}
                height={200}
                alt={`image-${ind + 1}`}
                className="w-full h-full my-1 rounded-md object-cover opacity-70 relative"
              />
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="files"
            className={`flex flex-col items-center justify-center gap-2 text-sm font-medium bg-accent py-4 rounded-md ${
              fileCount > 0 && fileCount <= imageQouta
                ? "border-2 border-green-500 text-green-500"
                : fileCount > imageQouta
                ? "border-2 border-red-500 text-red-500"
                : ""
            }`}
          >
            <div className="flex gap-2">
              <Images className="size-8" />
            </div>
            {fileCount > 0 ? (
              <div className="w-full text-center">
                <p>You can select upto {imageQouta} images</p>
                <p>{fileCount} Images Selected</p>
                <p>Only {imageQouta - fileCount} more Images are allowed </p>
              </div>
            ) : (
              `Upload Images (Max ${imageQouta})`
            )}
          </label>
          <Input
            id="files"
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
            onChange={handleFileChange}
            disabled={imageQouta <= 0}
            className={errors.images ? "border-red-500 hidden" : "hidden"}
          />
          <p className="text-xs text-muted-foreground mx-2">
            JPG, PNG or WEBP. Max 5MB per file
          </p>

          {/* Error Message */}
          {errors.images && (
            <span className="text-sm text-red-500 font-medium">
              {errors.images.message as string}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            fileCount <= 0 ||
            fileCount > imageQouta ||
            imageQouta <= 0
          }
          className="w-full"
        >
          {isSubmitting ? "Uploading..." : "Upload Images"} <Upload />
        </Button>
      </form>
    </div>
  );
}
