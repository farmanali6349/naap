"use client";
import { useAuth } from "../_contexts/Auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
export default function Logout() {
  const { logout, user } = useAuth();

  if (!user) {
    return null;
  }
  return (
    <Button variant={"destructive"} onClick={logout}>
      Logout <LogOut />
    </Button>
  );
}
