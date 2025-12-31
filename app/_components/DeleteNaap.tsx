import Dialog from "./Dialog";
import { Trash } from "lucide-react";
import DeleteNaapButton from "./DeleteNaapButton";

export default function DeleteNaap({
  naapId,
  imageIds,
}: {
  naapId: string;
  imageIds: string[];
}) {
  return (
    <Dialog
      title="Are You Sure?"
      description="Make sure after deleting naap, there is no way to recover the data"
      actionText="Delete Naap"
      actionIcon={Trash}
      actionVariant="destructive"
    >
      <DeleteNaapButton naapId={naapId} imageIds={imageIds} />
    </Dialog>
  );
}
