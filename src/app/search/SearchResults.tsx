"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    fetch(`${API_URL}/products`)
      .then((r) => r.json())
      .then((all: Product[]) => {
        const q = query.toLowerCase();
        setResults(all.filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        ));
      })
      .catch(() => toast.error("Search failed"))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .search-wrap { max-width: 1200px; margin: 0 auto; padding: 2rem 1.25rem 5rem; }
        @media (min-width: 768px) { .search-wrap { padding: 3rem 2rem 6rem; } }
        .search-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem 1.5rem; }
        @media (max-width: 1024px) { .search-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .search-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem 1rem; } }
        @media (max-width: 420px) { .search-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="search-wrap">
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.5rem" }}>
            Search Results
          </p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 300, color: "#3d2b2b", marginBottom: "0.4rem" }}>
            {query ? `Results for "${query}"` : "Search"}
          </h1>
          {!loading && query && (
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "rgba(61,43,43,0.4)", fontWeight: 300 }}>
              {results.length} product{results.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {loading && (
          <p style={{ textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.4)", padding: "3rem 0" }}>
            Searching...
          </p>
        )}

        {!loading && results.length === 0 && query && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, color: "rgba(61,43,43,0.3)", marginBottom: "1rem" }}>
              No results found
            </p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.4)", marginBottom: "1.5rem", fontWeight: 300 }}>
              Try searching for lotions, hair care, soaps or scrubs
            </p>
            <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", padding: "0.75rem 2rem", textDecoration: "none" }}>
              Browse All Products
            </Link>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="search-grid">
            {results.map((p) => (
              <div key={p._id} style={{ display: "flex", flexDirection: "column" }}>
                <Link href={"/product/" + p._id} style={{ textDecoration: "none" }}>
                  <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "#f7f5f2", marginBottom: "0.75rem" }}>
                    <img
                      src={p.images?.[0] || "/images/sheabutter.jpg"}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                </Link>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.13em", textTransform: "uppercase", textAlign: "center", color: "#3d2b2b", fontWeight: 500, marginBottom: "0.22rem" }}>
                  {p.name}
                </p>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.68rem", textAlign: "center", color: "rgba(61,43,43,0.42)", fontWeight: 300, marginBottom: "0.75rem" }}>
                  KSh {p.price.toLocaleString()}
                </p>
                <button
                  onClick={() => { addItem(p); toast.success(p.name + " added!"); }}
                  style={{ width: "100%", border: "1px solid rgba(61,43,43,0.2)", background: "transparent", color: "#3d2b2b", fontFamily: "Jost, sans-serif", fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.58rem 0.4rem", cursor: "pointer" }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}