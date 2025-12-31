"use client";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { deleteNaap as deleteNaapFromDb } from "@/lib/firebase/db";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function DeleteNaapButton({
  naapId,
  setOpen,
  imageIds,
}: {
  naapId: string;
  setOpen?: (open: boolean) => void;
  imageIds: string[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Delete Images Of The Naap From Cloudinary

  // Deleting from DB
  const deleteNaap = async () => {
    setLoading(true);

    const isDeleted = await deleteNaapFromDb(naapId);

    if (isDeleted) {
      console.log("Naap is deleted successfully from DB");

      // Delete Naap Images From Cloudinary
      if (imageIds.length > 0) {
        const res = await axios.post("/api/delete-images", { ids: imageIds });
        const { success, message } = res.data as {
          success: boolean;
          message: string;
        };

        if (success) {
          console.log("Images Deleted Successfully");
        } else {
          // TODO: Add Toast Alert
          console.log("Error deleting images :: ", message);
        }
      }

      setLoading(false);
      if (setOpen) {
        setOpen(false);
      }

      router.push("/");
    } else {
      console.log("Error deleting this naap");
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <Button
        disabled={loading}
        onClick={deleteNaap}
        variant={"destructive"}
        size={"lg"}
      >
        {!loading ? (
          <span className="flex items-center gap-2">
            Delete Naap <Trash />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Deleting...{" "}
            <span className="animate-spin">
              <Loader />
            </span>
          </span>
        )}
      </Button>
    </div>
  );
}
