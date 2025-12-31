import ZoomableImage from "./ZoomableImage";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Loader from "./Loader";
import { useState } from "react";

export default function NaapImage({
  url,
  alt,
  id,
  deleting,
  deleteImage,
}: {
  url: string;
  alt: string;
  id: string;
  deleting: boolean;
  deleteImage: (id: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCurrImage = async () => {
    setIsLoading(true);
    await deleteImage(id);
    setIsLoading(false);
  };

  // Delete Image Function
  if (isLoading) {
    return <Loader text="Deleting Image" />;
  }

  return (
    <div className="w-full mx-auto relative bg-card border border-border rounded-md mt-2">
      <div className="actions absolute right-4 top-4 z-5">
        <Button
          variant={"destructive"}
          onClick={deleteCurrImage}
          disabled={deleting}
        >
          Delete <Trash />
        </Button>
      </div>
      <div className="relative">
        <ZoomableImage src={url} alt={alt} />
      </div>
    </div>
  );
}
