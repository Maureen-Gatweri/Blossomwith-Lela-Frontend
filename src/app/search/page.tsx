import { Suspense } from "react";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: "center", padding: "4rem", fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.4)" }}>
        Searching...
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}