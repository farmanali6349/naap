"use client";
import { Pencil } from "lucide-react";
import NaapForm from "./forms/NaapForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function EditNaapDrawer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Edit <Pencil />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Naap</DialogTitle>
            <DialogDescription>Update Customer Details</DialogDescription>
          </DialogHeader>
          <div className="mx-auto max-w-lg w-full mb-6">
            <NaapForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          Edit <Pencil />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mb-6">
        <DrawerHeader>
          <DrawerTitle>Edit Naap</DrawerTitle>
          <DrawerDescription>Enter Customer Details</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto max-w-lg w-full mb-6">
          <NaapForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
