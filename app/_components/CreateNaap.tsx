"use client";
import { PlusCircle } from "lucide-react";
import NaapForm from "./forms/NaapForm";
import Dialog from "./Dialog";
export default function CreateNaap() {
  return (
    <Dialog
      title="Create New Naap"
      description="Enter Customer Details"
      actionText="Create"
      actionIcon={PlusCircle}
    >
      <NaapForm />
    </Dialog>
  );
}
