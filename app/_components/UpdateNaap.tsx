"use client";
import { Pencil } from "lucide-react";
import NaapForm from "./forms/NaapForm";
import Dialog from "./Dialog";
import { NaapDoc } from "@/lib/types";
type UpdateNaapProps = {
  naapId: string;
  customerName?: string;
  customerPhone: string;
  notes?: string;
  setNaap?: (naap: NaapDoc | null) => void;
};

export default function UpdateNaap({
  naapId,
  customerName,
  customerPhone,
  notes,
  setNaap,
}: UpdateNaapProps) {
  const defaultData = { naapId, customerName, customerPhone, notes };
  return (
    <Dialog
      title="Update Naap"
      description="Change Customer Details"
      actionText="Edit"
      actionIcon={Pencil}
    >
      <NaapForm defaultData={defaultData} setNaap={setNaap} />
    </Dialog>
  );
}
