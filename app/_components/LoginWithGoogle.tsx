"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, authProvider } from "@/lib/firebase/authentication";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../_contexts/Auth";

export default function LoginWithGoogle() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, authProvider);
      if (result.user) {
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);
  return (
    <Button onClick={handleLogin} className="cursor-pointer">
      {" "}
      <Image
        src={"/icons/google.svg"}
        width={24}
        height={24}
        alt="Google Logo"
      ></Image>{" "}
      Login with Google
    </Button>
  );
}
