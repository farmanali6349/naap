"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Phone, House } from "lucide-react";
import { ProtectedRoute } from "@/app/_components/ProtectedRoute";
import Link from "next/link";
import UploadImagesForm from "@/app/_components/forms/UploadImagesForm";
import { useEffect, useState } from "react";
import { ImageDoc, NaapDoc } from "@/lib/types";
import { useParams } from "next/navigation";
import { getAllImages, getNaap } from "@/lib/firebase/db";
import NaapImage from "@/app/_components/NaapImage";
import UpdateNaap from "@/app/_components/UpdateNaap";
import DeleteNaap from "@/app/_components/DeleteNaap";
import NaapPageLoader from "@/app/_components/skeleton-loaders/NaapPageLoader";
import NaapPageImagesLoader from "@/app/_components/skeleton-loaders/NaapPageImagesLoader";

// Import For Image Deletion
import { deleteImage as deleteImageFromDb } from "@/lib/firebase/db";
import axios from "axios";
import { APIResponse } from "@/lib/types";
import EmptyNaapPage from "@/app/_components/empty-content/EmptyNaapPage";
import { useAuth } from "@/app/_contexts/Auth";
/**
 *
 * Components
 * 1. User Details (Name, Phone, Notes) + Actions (Edit & Delete)
 * 2. Images (Display Images Related To Naap)
 * 3. Upload Naap Form
 * 4. Delete Naap (Danger Zone)
 */
export default function NapPage() {
  const { id } = useParams();
  const [naap, setNaap] = useState<NaapDoc | null>(null);
  const [images, setImages] = useState<ImageDoc[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();

  const loadImages = async (updatedImages: ImageDoc[]) => {
    const allImages = images ? [...images, ...updatedImages] : updatedImages;
    setImages(allImages);
  };

  // Image Deletion
  const deleteFromCloudinary = async (cloudinaryId: string) => {
    try {
      const res = await axios.post("/api/delete-image", { id: cloudinaryId });
      const { success, message } = res.data as APIResponse;
      if (success) {
        // TODO: Add Toast Notification Here
        console.log(message);
      }
    } catch (error) {
      console.log("Error deleting image from cloudinary :: ", error);
      // TODO: Add Toast Notifciation Here
    }
  };

  const deleteRegistry = async (id: string) => {
    try {
      const res = await deleteImageFromDb(id);

      if (res) {
        // Remove Image From Curr State
        toast.success("Image deleted successfully");
        console.log("Image deleted from database successfully.");
      }
    } catch (error) {
      toast.error("Image deleted successfully");
      console.log("Error deleting image from registery :: ", error);
    }
  };

  const deleteImage = async (id: string) => {
    setDeleting(true);
    const img =
      images && images.length > 0 ? images.find((img) => img.id === id) : null;
    if (img) {
      await deleteFromCloudinary(img.cloudinaryId);
      await deleteRegistry(img.id);

      // Removing Images Locally
      if (images && images.length > 0) {
        const updatedImages = images.filter((img) => img.id !== id);
        setImages(updatedImages);
      }
    }
    setDeleting(false);
  };

  useEffect(() => {
    if (typeof id === "string") {
      const loadNaap = async () => {
        const res = await getNaap(id);
        setNaap(res);
        setIsLoading(false);
      };

      const loadImages = async () => {
        if (user?.uid) {
          const res = await getAllImages(user.uid, id);
          setImages(res);
        }
        setIsLoadingImages(false);
      };

      loadNaap().finally(() => loadImages());
    }
  }, [id, user]);

  // Loading state
  if (isLoading) {
    return <NaapPageLoader />;
  }

  // No data state
  if (!naap) {
    toast.error("No Naap Found");
    return (
      <main>
        <EmptyNaapPage />
      </main>
    );
  }

  // Success state
  return (
    <ProtectedRoute>
      <main className="max-w-lg mx-auto w-full">
        {/* Back To Home Button */}
        <div className="m-4">
          <Button variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <House />
              Home
            </Link>
          </Button>
        </div>

        {/* Nap Customer Phone & Name */}
        <div className="flex justify-between gap-4 mx-4">
          <div>
            <h3 className="text-2xl font-medium">{naap.customerPhone}</h3>
            {naap.customerName && (
              <h4 className="text-xl">{naap.customerName}</h4>
            )}
          </div>

          {/* Controls & Buttons */}
          <div className="flex gap-1">
            <UpdateNaap
              naapId={naap.id}
              customerPhone={naap.customerPhone}
              customerName={naap?.customerName}
              notes={naap?.notes}
              setNaap={setNaap}
            />
            <Button variant="secondary">
              <Link
                href={`tel:${naap.customerPhone}`}
                className="flex items-center gap-2"
              >
                <Phone />
                Call
              </Link>
            </Button>
          </div>
        </div>

        {/* Notes */}
        {naap.notes && (
          <div className="my-6 p-4">
            <h4 className="text-lg font-medium">Notes</h4>
            <p className="bg-yellow-300/30 text-primary p-2 rounded-sm mt-2">
              {naap.notes}
            </p>
          </div>
        )}

        {/* Images */}
        {isLoadingImages ? (
          <div className="max-w-lg px-4 w-full">
            <NaapPageImagesLoader />
          </div>
        ) : (
          <div className="max-w-lg mx-auto w-full mt-6">
            <div className="w-full px-4">
              {images &&
                images?.length > 0 &&
                images?.map((img, ind) => {
                  return (
                    <NaapImage
                      key={ind}
                      url={img.url}
                      id={img?.id}
                      alt={`Naap Image ${ind}`}
                      deleteImage={deleteImage}
                      deleting={deleting}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {/* Form To Upload Images */}
        <div className="mx-4 my-6">
          <h4 className="text-lg font-medium">Upload Images</h4>
          <UploadImagesForm
            loadImages={loadImages}
            noOfImages={images ? Number(images?.length) : 0}
          />
        </div>

        {/* Danger Zone */}
        <div className="w-full max-w-lg mx-auto px-4 mt-20 mb-10">
          <div className="rounded-xl border-2 bg-card border-red-500 w-full p-6">
            <h4 className="text-lg font-medium text-center text-red-500 mb-6">
              Danger Zone
            </h4>

            <div className="flex items-center justify-center w-full">
              <DeleteNaap
                naapId={naap.id}
                imageIds={!images ? [] : images.map((img) => img.cloudinaryId)}
              />
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
