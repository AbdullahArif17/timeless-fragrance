"use client";

import { Suspense } from "react";
import SearchResult from "@/components/searchResult";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResult />
    </Suspense>
  );
}