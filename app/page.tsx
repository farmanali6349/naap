"use client";
import NaapCards from "./_components/NaapCards";
import Welcome from "./_components/Welcome";
import { ProtectedRoute } from "./_components/ProtectedRoute";
import { useState } from "react";
import FilterSearch from "./_components/FilterSearch";
import CreateNaap from "./_components/CreateNaap";

// Home Page
// Header
// Welcome Text
// Search Bar + Create Naap
// Naap Cards

export default function Home() {
  // Handle Filter & Filter Text
  const [filterText, setFilterText] = useState("");
  return (
    <ProtectedRoute>
      <main className="px-4">
        <Welcome />
        {/* Filter Input & Create Naap Button */}
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-4 flex items-center gap-2">
            <FilterSearch
              filterText={filterText}
              setFilterText={setFilterText}
            />
            <div>
              <CreateNaap />
            </div>
          </div>
        </div>
        <NaapCards filterText={filterText} />
        <div className="max-w-lg w-full mx-auto"></div>
      </main>
    </ProtectedRoute>
  );
}
