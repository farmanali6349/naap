"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { NaapDoc } from "@/lib/types";

// Functions To Perform (Create Naap, Update Naap)
import { createNaap, updateNaap } from "@/lib/firebase/db";

// Shadcn UI Components
import { Button } from "@/components/ui/button";

// Icon from Lucid React
import { UserPen, Smartphone, NotebookPen } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useAuth } from "@/app/_contexts/Auth";

// -- Validation Schema --
const naapSchema = z.object({
  customerName: z.string().optional(),
  customerPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone format"),
  notes: z.string().optional(),
});

type NaapFormData = z.infer<typeof naapSchema>;

export default function NaapForm({
  defaultData,
  setOpen,
  setNaap,
}: {
  defaultData?: NaapFormData & { naapId: string };
  setOpen?: (open: boolean) => void;
  naap?: NaapDoc | null;
  setNaap?: (naap: NaapDoc | null) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NaapFormData>({
    resolver: zodResolver(naapSchema),
    defaultValues: {
      customerName: (defaultData && defaultData?.customerName) || "",
      customerPhone: (defaultData && defaultData.customerPhone) || "",
      notes: (defaultData && defaultData?.notes) || "",
    },
  });

  const { user } = useAuth();
  const router = useRouter();

  // Create Naap
  const createNewNaap = async (userId: string, data: NaapFormData) => {
    const naapId = await createNaap({ userId, ...data });
    router.push(`/naap/${naapId}`);
  };

  const confirmChanges = (data: NaapFormData) => {
    if (!defaultData) return true;

    const normalize = (val?: string) => (val ?? "").trim();

    const hasChanged =
      normalize(data.customerName) !== normalize(defaultData.customerName) ||
      normalize(data.customerPhone) !== normalize(defaultData.customerPhone) ||
      normalize(data.notes) !== normalize(defaultData.notes);

    return hasChanged;
  };

  const updateCurrNaap = async (data: NaapFormData) => {
    if (defaultData && confirmChanges(data) && user?.uid) {
      const isUpdated = await updateNaap(user.uid, defaultData.naapId, data);
      if (isUpdated && setNaap && user) {
        setNaap({
          ...data,
          id: defaultData.naapId,
          userId: user?.uid,
        });
      }
    }
    return;
  };

  const onsubmit = async (data: NaapFormData) => {
    try {
      if (user?.uid) {
        if (!defaultData) {
          await createNewNaap(user?.uid, data);
          toast.success("Naap Created Successfully");
        } else {
          await updateCurrNaap(data);
          toast.success("Naap Updated Successfully");
        }
      }

      if (setOpen) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Submission failed", error);
      toast.error("Failed To Submit Form");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* Customer Name */}
        {/* Full Name - Optional */}
        <div className="flex flex-col gap-1.5 mt-3">
          <label htmlFor="customerName" className="text-sm font-medium">
            Full Name (Optional)
          </label>
          <InputGroup>
            <InputGroupInput
              id="customerName"
              placeholder="Enter Full Name"
              {...register("customerName")}
            />
            <InputGroupAddon>
              <UserPen />
            </InputGroupAddon>
          </InputGroup>

          {errors.customerName && (
            <span className="text-xs text-red-500">
              {errors.customerName.message}
            </span>
          )}
        </div>

        {/* Phone - Required */}
        <div className="flex flex-col gap-1.5 mt-3">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <InputGroup>
            <InputGroupInput
              id="customerPhone"
              type="tel"
              placeholder="03053666838"
              className={
                errors.customerPhone
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
              {...register("customerPhone")}
            />
            <InputGroupAddon>
              <Smartphone />
            </InputGroupAddon>
          </InputGroup>

          {errors.customerPhone && (
            <span className="text-xs text-red-500 font-medium">
              {errors.customerPhone.message}
            </span>
          )}
        </div>

        {/* Notes - Optional */}
        <div className="flex flex-col gap-1.5 mt-3">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes (Optional)
          </label>
          <InputGroup>
            <InputGroupTextarea
              id="notes"
              placeholder="Any specific requests?"
              {...register("notes")}
            />
            <InputGroupAddon>
              <NotebookPen />
            </InputGroupAddon>
          </InputGroup>

          {errors.notes && (
            <span className="text-xs text-red-500">{errors.notes.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
          {isSubmitting
            ? "Saving..."
            : defaultData
            ? "Update Naap"
            : "Create Naap"}
        </Button>
      </form>
    </div>
  );
}
