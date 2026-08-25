"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { getProductById } from "@/lib/api";
import { Product } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const addItem = useCartStore((s) => s.addItem);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.85rem", color: "rgba(61,43,43,0.4)" }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.5rem" }}>Product not found</h2>
        <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", padding: "0.85rem 2.5rem", textDecoration: "none" }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : ["/images/sheabutter.jpg"];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    toast.success(`${product.name} added to cart!`, {
      style: { fontFamily: "Jost, sans-serif", fontSize: "13px" },
    });
  };

  return (
    <>
      <Toaster position="top-right" />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 2rem 0" }}>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.35)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          {" / "}
          <Link href="/shop" style={{ color: "inherit", textDecoration: "none" }}>Shop</Link>
          {" / "}
          <span style={{ color: "rgba(61,43,43,0.6)" }}>{product.name}</span>
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

          {/* LEFT — Gallery */}
          <div>
            <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", background: "#f7f5f2", marginBottom: "0.85rem", position: "relative" }}>
              <img
                src={images[activeImage]}
                alt={`${product.name} view ${activeImage + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {product.isFeatured && (
                <span style={{ position: "absolute", top: "1rem", left: "1rem", background: "#3d2b2b", color: "#fff", fontFamily: "Jost, sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.3rem 0.75rem" }}>
                  Bestseller
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: "0.6rem" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      aspectRatio: "1/1", overflow: "hidden", background: "#f7f5f2",
                      border: activeImage === i ? "2px solid #3d2b2b" : "2px solid transparent",
                      cursor: "pointer", padding: 0, opacity: activeImage === i ? 1 : 0.55, transition: "all 0.2s",
                    }}>
                    <img src={img} alt={`view ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Info */}
          <div style={{ paddingTop: "0.5rem" }}>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.85rem" }}>
              {product.category}
            </p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.8rem", fontWeight: 300, color: "#3d2b2b", lineHeight: 1.15, marginBottom: "1rem" }}>
              {product.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: s <= Math.round(product.ratings || 4.8) ? "#c97b84" : "rgba(61,43,43,0.15)", fontSize: "0.85rem" }}>★</span>
                ))}
              </div>
              <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "rgba(61,43,43,0.4)", fontWeight: 300 }}>
                {product.ratings || 4.8} · {product.numReviews || 0} reviews
              </span>
            </div>

            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.25rem" }}>
              KSh {product.price.toLocaleString()}
            </p>

            <div style={{ borderTop: "1px solid rgba(61,43,43,0.08)", marginBottom: "1.25rem" }} />

            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.85rem", color: "rgba(61,43,43,0.58)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1.5rem" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: product.stock > 0 ? "#16a34a" : "#ef4444" }} />
              <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "rgba(61,43,43,0.5)", fontWeight: 300 }}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.4)", width: "2rem" }}>Qty</span>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(61,43,43,0.18)" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "36px", height: "36px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#3d2b2b" }}>−</button>
                <span style={{ width: "36px", textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.82rem", color: "#3d2b2b" }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{ width: "36px", height: "36px", background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#3d2b2b" }}>+</button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              style={{ width: "100%", background: "#3d2b2b", color: "#fff", fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "1rem", border: "none", cursor: "pointer", marginBottom: "0.75rem", opacity: product.stock === 0 ? 0.4 : 1 }}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <Link href="/cart" style={{ display: "block", width: "100%", textAlign: "center", border: "1px solid rgba(61,43,43,0.2)", color: "#3d2b2b", fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.9rem", textDecoration: "none", boxSizing: "border-box" }}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}