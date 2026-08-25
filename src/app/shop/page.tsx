
"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Link from "next/link";
import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const CATS = ["All", "Lotion", "Hair", "Soap", "Oil", "Scrub", "Butter"];

function Card({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [hov, setHov] = useState(false);
  const [btn, setBtn] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link href={"/product/" + product._id} style={{ textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "#f7f5f2", marginBottom: "0.75rem" }}>
          <img
            src={product.images?.[0] || "/images/sheabutter.jpg"}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s ease" }}
          />
          {product.isFeatured && (
            <span style={{ position: "absolute", top: "0.6rem", left: "0.6rem", background: "#3d2b2b", color: "#fff", fontFamily: "Jost, sans-serif", fontSize: "0.48rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.22rem 0.5rem" }}>
              Bestseller
            </span>
          )}
        </div>
      </Link>
      <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.58rem", letterSpacing: "0.13em", textTransform: "uppercase", textAlign: "center", color: "#3d2b2b", fontWeight: 500, marginBottom: "0.22rem" }}>
        {product.name}
      </p>
      <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", textAlign: "center", color: "rgba(61,43,43,0.42)", fontWeight: 300, marginBottom: "0.72rem" }}>
        KSh {product.price.toLocaleString()}
      </p>
      <button
        onClick={onAdd}
        onMouseEnter={() => setBtn(true)}
        onMouseLeave={() => setBtn(false)}
        style={{ width: "100%", border: "1px solid rgba(61,43,43,0.2)", background: btn ? "#3d2b2b" : "transparent", color: btn ? "#fff" : "#3d2b2b", fontFamily: "Jost, sans-serif", fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.58rem 0.4rem", cursor: "pointer", transition: "all 0.22s" }}>
        Add to Cart
      </button>
    </div>
  );
}

export default function ShopPage() {
  const [cat, setCat] = useState("All");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const addItem = useCartStore((s) => s.addItem);

  // Fetch ALL products once on mount
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/products`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Server error: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        console.log("Products fetched:", data.length);
        setAllProducts(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not load products. Make sure your backend is running.");
        toast.error("Could not connect to server");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter locally — no extra API call needed
  const filtered = cat === "All"
    ? allProducts
    : allProducts.filter((p) =>
        p.category.toLowerCase() === cat.toLowerCase()
      );

  const handleAdd = (p: Product) => {
    addItem(p);
    toast.success(p.name + " added!", {
      style: { fontFamily: "Jost, sans-serif", fontSize: "13px" },
    });
  };

  return (
    <>
      <style>{`
        .shop-wrap { max-width: 1200px; margin: 0 auto; padding: 2rem 1.25rem 5rem; }
        @media (min-width: 768px) { .shop-wrap { padding: 3rem 2rem 6rem; } }
        .shop-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem 1.5rem; }
        @media (max-width: 1100px) { .shop-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .shop-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem 1rem; } }
        @media (max-width: 420px)  { .shop-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .shop-cats { display: flex; justify-content: center; gap: 0.4rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .shop-cat { font-family: Jost, sans-serif; font-size: 0.56rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.42rem 1rem; border: 1px solid rgba(61,43,43,0.18); cursor: pointer; transition: all 0.2s; background: transparent; }
      `}</style>

      <Toaster position="top-right" />

      <div className="shop-wrap">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.5rem" }}>
            Blossom with Lela
          </p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#3d2b2b", marginBottom: "0.4rem" }}>
            All Products
          </h1>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "rgba(61,43,43,0.38)", fontWeight: 300 }}>
            Natural products for your everyday glow
          </p>
        </div>

        {/* Category filters */}
        <div className="shop-cats">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="shop-cat"
              style={{ background: cat === c ? "#3d2b2b" : "transparent", color: cat === c ? "#fff" : "rgba(61,43,43,0.55)", borderColor: cat === c ? "#3d2b2b" : "rgba(61,43,43,0.18)" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Product count */}
        {!loading && !error && (
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(61,43,43,0.28)", marginBottom: "1.5rem" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        <div style={{ borderTop: "1px solid rgba(61,43,43,0.07)", marginBottom: "2rem" }} />

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.35)" }}>
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300, color: "rgba(61,43,43,0.4)", marginBottom: "1rem" }}>
              Could not load products
            </p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "rgba(61,43,43,0.4)", marginBottom: "1.5rem", fontWeight: 300 }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", background: "none", padding: "0.75rem 2rem", cursor: "pointer" }}>
              Try Again
            </button>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="shop-grid">
            {filtered.map((p) => (
              <Card key={p._id} product={p} onAdd={() => handleAdd(p)} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && allProducts.length > 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 300, color: "rgba(61,43,43,0.3)", marginBottom: "1rem" }}>
              No {cat} products yet
            </p>
            <button onClick={() => setCat("All")}
              style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c97b84", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              View all products
            </button>
          </div>
        )}

        {/* No products at all */}
        {!loading && !error && allProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 300, color: "rgba(61,43,43,0.3)", marginBottom: "1rem" }}>
              No products found
            </p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "rgba(61,43,43,0.4)", marginBottom: "1.5rem", fontWeight: 300 }}>
              Make sure your backend server is running on port 5000
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", background: "none", padding: "0.75rem 2rem", cursor: "pointer" }}>
              Refresh
            </button>
          </div>
        )}

      </div>
    </>
  );
}