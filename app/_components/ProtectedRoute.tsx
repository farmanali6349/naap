"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../_contexts/Auth";
import Loader from "./Loader";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there is no user, redirect to login
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show nothing or a loading spinner while checking auth status
  if (loading || !user) {
    return (
      <div className="flex h-[50dvh] w-full items-center justify-center">
        <Loader text="Authenticating..." />
      </div>
    );
  }

  return <>{children}</>;
}
