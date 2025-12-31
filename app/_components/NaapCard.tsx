import { Button } from "@/components/ui/button";
import { RulerDimensionLine } from "lucide-react";
import Link from "next/link";
export default function NaapCard({
  name,
  phone,
  id,
}: {
  name?: string;
  phone: string;
  id: string;
}) {
  return (
    <div className="bg-card text-card-foreground border p-2 sm:p4 rounded-md flex items-center justify-between">
      <div className="grow">
        <h3 className="font-medium text-lg">{phone}</h3>
        {name && <h4 className="text-base">{name}</h4>}
      </div>
      <Button variant={"secondary"}>
        <Link href={`/naap/${id}`} className="flex items-center gap-2">
          View Naap <RulerDimensionLine />
        </Link>
      </Button>
    </div>
  );
}
