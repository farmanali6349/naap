import { Skeleton } from "@/components/ui/skeleton";

export default function NaapPageImagesLoader() {
  return (
    <div className="w-full mt-8">
      <Skeleton className="h-62.5 w-full" />
      <Skeleton className="h-62.5 w-full mt-3" />
    </div>
  );
}
