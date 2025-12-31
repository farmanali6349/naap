"use client";

import NaapCard from "./NaapCard";
import { useEffect, useState } from "react";
import { NaapDoc } from "@/lib/types";
import { useAuth } from "../_contexts/Auth";
import { getAllNaaps } from "@/lib/firebase/db";
import NaapCardsLoader from "./skeleton-loaders/NaapCardsLoader";
import EmptyNaapCards from "./empty-content/EmptyNaapCards";

export default function NaapCards({ filterText }: { filterText: string }) {
  const [naaps, setNaaps] = useState<NaapDoc[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filteredNaaps, setFilteredNaaps] = useState<NaapDoc[]>([]);
  const renderNaaps = filteredNaaps.length > 0 ? filteredNaaps : naaps;

  const { user } = useAuth();

  useEffect(() => {
    // Checking User Id
    const userId = user?.uid;

    if (typeof userId === "string") {
      // Defining Function
      const loadNaaps = async () => {
        const res = await getAllNaaps(userId);
        return setNaaps(res);
      };

      // Calling Function
      loadNaaps().finally(() => setIsLoading(false));
    }
  }, [user]);

  useEffect(() => {
    const filterNaaps = (filterText: string) => {
      if (!filterText) {
        setFilteredNaaps([]);
        return;
      }

      const filtered = naaps?.filter(
        (naap) =>
          naap.customerPhone.includes(filterText) ||
          naap.customerName
            ?.toLocaleLowerCase()
            ?.includes(filterText.toLocaleLowerCase())
      );

      if (filtered) {
        return setFilteredNaaps(filtered);
      }
    };

    filterNaaps(filterText);
  }, [filterText, naaps]);

  if (renderNaaps && !(renderNaaps?.length > 0)) {
    return <EmptyNaapCards />;
  }

  return (
    <div className="w-full max-w-lg mx-auto grid grid-cols-1 gap-2">
      {isLoading && <NaapCardsLoader />}
      {!isLoading && !renderNaaps && (
        <p className="text-lg text-center font-medium">No Naap Found</p>
      )}
      {!isLoading && filterText && !(filteredNaaps.length > 0) && (
        <p className="text-lg text-center font-medium my-2">
          No Naap Found for <b>{filterText}</b>
        </p>
      )}

      {renderNaaps &&
        renderNaaps.map((naap) => (
          <NaapCard
            key={naap.id}
            name={naap.customerName}
            phone={naap.customerPhone}
            id={naap.id}
          />
        ))}
    </div>
  );
}
