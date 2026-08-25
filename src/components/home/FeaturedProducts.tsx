"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import Link from "next/link";
import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [hov, setHov] = useState(false);
  const [btn, setBtn] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link href={"/product/" + product._id} style={{ textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "#f7f5f2", marginBottom: "0.85rem" }}>
          <img
            src={product.images?.[0] || "/images/sheabutter.jpg"}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s ease" }}
          />
          {product.isFeatured && (
            <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "#3d2b2b", color: "#fff", fontFamily: "Jost, sans-serif", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.55rem" }}>
              Bestseller
            </span>
          )}
        </div>
      </Link>
      <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center", color: "#3d2b2b", fontWeight: 500, marginBottom: "0.25rem" }}>
        {product.name}
      </p>
      <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", textAlign: "center", color: "rgba(61,43,43,0.45)", fontWeight: 300, marginBottom: "0.85rem" }}>
        KSh {product.price.toLocaleString()}
      </p>
      <button
        onClick={() => { addItem(product); toast.success(product.name + " added!"); }}
        onMouseEnter={() => setBtn(true)}
        onMouseLeave={() => setBtn(false)}
        style={{ width: "100%", border: "1px solid rgba(61,43,43,0.22)", background: btn ? "#3d2b2b" : "transparent", color: btn ? "#fff" : "#3d2b2b", fontFamily: "Jost, sans-serif", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.65rem 0.5rem", cursor: "pointer", transition: "all 0.22s" }}>
        Add to Cart
      </button>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    // Fetch all products and show isFeatured ones
    // Falls back to showing first 8 if none are marked featured
    fetch(`${API_URL}/products`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Product[]) => {
        const featured = data.filter((p) => p.isFeatured);
        // If no featured products, show first 8
        setProducts(featured.length > 0 ? featured : data.slice(0, 8));
      })
      .catch((err) => console.error("Featured products error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .fp-wrap { padding: 3.5rem 1.25rem; background: #fff; }
        @media (min-width: 768px) { .fp-wrap { padding: 5rem 2rem; } }
        .fp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem 1.5rem; }
        @media (max-width: 1100px) { .fp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem 1rem; } }
        @media (max-width: 420px)  { .fp-grid { grid-template-columns: 1fr; gap: 2rem; } }
      `}</style>

      <section className="fp-wrap">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(61,43,43,0.4)", marginBottom: "0.7rem" }}>
              Our Collection
            </p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 300, color: "#3d2b2b", marginBottom: "0.5rem" }}>
              For the Natural Girlies
            </h2>
            <div style={{ width: "2rem", height: "1px", background: "rgba(61,43,43,0.18)", margin: "0 auto" }} />
          </div>

          {loading ? (
            <p style={{ textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.35)", padding: "2rem" }}>
              Loading...
            </p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.35)", padding: "2rem" }}>
              No products available. Make sure your backend is running.
            </p>
          ) : (
            <div className="fp-grid">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              href="/shop"
              onMouseEnter={() => setBtn(true)}
              onMouseLeave={() => setBtn(false)}
              style={{ display: "inline-block", border: "1px solid #3d2b2b", fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.9rem 3rem", textDecoration: "none", transition: "all 0.3s", background: btn ? "#3d2b2b" : "transparent", color: btn ? "#fff" : "#3d2b2b" }}>
              View All Products
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}