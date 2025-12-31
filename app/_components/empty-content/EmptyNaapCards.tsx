import { RulerDimensionLine } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CreateNaap from "../CreateNaap";

export default function EmptyNaapCards() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RulerDimensionLine />
        </EmptyMedia>
        <EmptyTitle>No Naap Found</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <CreateNaap />
      </EmptyContent>
    </Empty>
  );
}
