import { Skeleton } from "@/components/ui/skeleton";

export default function NaapCardsLoader() {
  return (
    <div className="max-w-lg w-full flex flex-col gap-2">
      <Skeleton className="h-17.5" />
      <Skeleton className="h-17.5" />
      <Skeleton className="h-17.5" />
      <Skeleton className="h-17.5" />
      <Skeleton className="h-17.5" />
    </div>
  );
}
