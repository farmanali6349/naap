import { Spinner } from "@/components/ui/spinner";

export default function Loader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-col w-full h-50">
      <Spinner className="size-8" />
      <p className="text-lg text-center">{text}</p>
    </div>
  );
}
