"use client";

import { useAuth } from "../_contexts/Auth";

export default function Welcome() {
  const { user } = useAuth();
  if (user?.displayName) {
    return (
      <h2 className="text-2xl text-center my-4">
        Welcome{" "}
        <span className="text-blue-800 font-medium">{user.displayName}</span>
      </h2>
    );
  }
}
