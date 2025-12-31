"use client";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { deleteNaap as deleteNaapFromDb } from "@/lib/firebase/db";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../_contexts/Auth";
import { toast } from "sonner";

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
  const { user } = useAuth();

  // Delete Images Of The Naap From Cloudinary

  // Deleting from DB
  const deleteNaap = async () => {
    setLoading(true);

    if (user?.uid) {
      const isDeleted = await deleteNaapFromDb(user.uid, naapId);
      if (isDeleted) {
        toast.success("Naap Deleted Successfully");
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
            toast.error("Error Deleting This Naap Images : " + message);
          }
        }

        setLoading(false);
        if (setOpen) {
          setOpen(false);
        }

        router.push("/");
      } else {
        toast.error("Error Deleting This Naap");
      }
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
