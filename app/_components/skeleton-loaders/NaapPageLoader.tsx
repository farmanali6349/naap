import { Skeleton } from "@/components/ui/skeleton";
import NaapPageImagesLoader from "./NaapPageImagesLoader";

export default function NaapPageLoader() {
  return (
    <div className="max-w-lg px-4 my-4 w-full mt-6 mx-auto">
      {/* Back Button */}
      <Skeleton className="h-10 w-20" />

      {/* User Details (Phone, Name, Actions) */}
      <div className="flex items-start justify-between gap-6 mt-6">
        {/* Phone + Name */}
        <div className="w-[70%]">
          <Skeleton className="h-8 w-full max-w-50" />
          <Skeleton className=" h-6 w-full max-w-25 mt-2" />
        </div>
        {/* Actions */}
        <div className="flex gap-2 items-center">
          <Skeleton className="h-10 w-15" />
          <Skeleton className="h-10 w-15" />
        </div>
      </div>

      {/* Notes */}
      <div className="w-full mt-8">
        <Skeleton className="h-8 w-full max-w-25" />
        <Skeleton className="h-6 w-full mt-3" />
        <Skeleton className="h-6 w-full mt-3" />
      </div>

      {/* Images */}
      <NaapPageImagesLoader />
    </div>
  );
}
