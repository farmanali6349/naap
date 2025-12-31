import { RulerDimensionLine, House } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export default function EmptyNaapPage() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RulerDimensionLine />
        </EmptyMedia>
        <EmptyTitle>404 No Naap Found</EmptyTitle>
        <EmptyDescription>
          No Such Naap Exisit On Our Server, Please Visit Home
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Link className="flex items-center gap-3" href={"/"}>
            Home <House />
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
