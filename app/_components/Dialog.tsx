"use client";
import { cloneElement, isValidElement } from "react";

type DrawerChildProps = {
  setOpen?: (open: boolean) => void;
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FormDrawer({
  title,
  description,
  children,
  actionText,
  actionIcon: ActionIcon,
  actionVariant,
}: {
  title?: string;
  description?: string;
  children: React.ReactElement<DrawerChildProps>;
  actionText?: string;
  actionIcon?: React.ElementType;
  actionVariant?: "destructive" | "default";
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={actionVariant || "default"}>
          {actionText} {ActionIcon && <ActionIcon />}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || "Dialog Title"}</DialogTitle>
          <DialogDescription>
            {description || "Dialog Description"}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {isValidElement(children)
          ? cloneElement(children, { setOpen })
          : children}
      </DialogContent>
    </Dialog>
  );
}
