"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Link from "next/link";

const ALL_PRODUCTS: Product[] = [
  { _id: "1", name: "Shea Butter Lotion", description: "Rich and creamy body lotion made with pure shea butter. Deeply nourishing and long lasting.", price: 850, category: "Lotion", images: ["/images/buttter.jpg", "/images/butter.jpg", "/images/butter.jpg"], stock: 20, isFeatured: true, ratings: 4.8, numReviews: 12 },
  { _id: "2", name: "Rosehip Face Oil", description: "Cold-pressed rosehip oil packed with vitamins A and C. Brightens and firms skin.", price: 1200, category: "Oil", images: ["/images/rosehip.jpg", "/images/rosehip.jpg", "/images/rosehip.jpg"], stock: 15, isFeatured: true, ratings: 5.0, numReviews: 8 },
  { _id: "3", name: "Coconut Hair Mask", description: "Deep conditioning treatment with virgin coconut oil and aloe vera.", price: 650, category: "Hair", images: ["/images/conditioners.jpg", "/images/conditioners.jpg", "/images/conditioners.jpg"], stock: 30, isFeatured: false, ratings: 4.6, numReviews: 20 },
  { _id: "4", name: "Lavender Soap Bar", description: "Handcrafted cold-process soap with lavender essential oil.", price: 350, category: "Soap", images: ["/images/soap.jpg", "/images/soap.jpg", "/images/soap.jpg"], stock: 50, isFeatured: false, ratings: 4.9, numReviews: 35 },
  { _id: "5", name: "LelaBody Scrub", description: "Brightening body scrub with raw turmeric and honey.", price: 750, category: "Soap", images: ["/images/scrub.jpg", "/images/scrub.jpg", "/images/scrub.jpg"], stock: 25, isFeatured: false, ratings: 4.7, numReviews: 18 },
  { _id: "6", name: "Almond Oil", description: "Lightweight almond oil that seals in moisture and promotes growth.", price: 950, category: "Hair", images: ["/images/almond.jpg", "/images/almond.jpg", "/images/almond.jpg"], stock: 12, isFeatured: false, ratings: 4.5, numReviews: 9 },
  { _id: "7", name: "Cocoa Butter Lotion", description: "Deep moisture cocoa butter lotion for silky smooth skin.", price: 900, category: "Lotion", images: ["/images/cocoa-butter-lotion.jpg", "/images/cocoa-butter-lotion.jpg", "/images/cocoa-butter-lotion.jpg"], stock: 18, isFeatured: false, ratings: 4.8, numReviews: 14 },
  { _id: "8", name: "Raw Shea Butter", description: "Pure unrefined shea butter straight from the source.", price: 600, category: "Lotion", images: ["/images/raaw-shea-butter.jpg", "/images/raaw-shea-butter.jpg", "/images/raaw-shea-butter.jpg"], stock: 22, isFeatured: false, ratings: 4.9, numReviews: 31 },
];

const CATEGORIES = ["All", "Lotion", "Oil", "Hair", "Soap"];

function ShopProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(product.name + " added!", {
      style: { fontFamily: "Jost, sans-serif", fontSize: "13px" },
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* Image container — fixed height, no overflow */}
      <Link href={"/product/" + product._id} style={{ textDecoration: "none", display: "block" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            background: "#f7f5f2",
            marginBottom: "0.85rem",
          }}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          {product.isFeatured && (
            <span style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              background: "#3d2b2b",
              color: "#fff",
              fontFamily: "Jost, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.3rem 0.6rem",
            }}>
              Bestseller
            </span>
          )}
        </div>
      </Link>

      {/* Product name */}
      <p style={{
        fontFamily: "Jost, sans-serif",
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        textAlign: "center",
        color: "#3d2b2b",
        fontWeight: 500,
        marginBottom: "0.35rem",
      }}>
        {product.name}
      </p>

      {/* Price */}
      <p style={{
        fontFamily: "Jost, sans-serif",
        fontSize: "0.72rem",
        textAlign: "center",
        color: "rgba(61,43,43,0.5)",
        marginBottom: "0.85rem",
        fontWeight: 300,
      }}>
        KSh {product.price.toLocaleString()}
      </p>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        style={{
          width: "100%",
          border: "1px solid rgba(61,43,43,0.22)",
          background: "transparent",
          color: "#3d2b2b",
          fontFamily: "Jost, sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "0.65rem 0.5rem",
          cursor: "pointer",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#3d2b2b";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#3d2b2b";
        }}>
        Add to Cart
      </button>

    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Toaster position="top-right" />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{
            fontFamily: "Jost, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c97b84",
            marginBottom: "0.75rem",
          }}>
            Blossom with Lela
          </p>
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "3rem",
            fontWeight: 300,
            color: "#3d2b2b",
            marginBottom: "0.5rem",
          }}>
            All Products
          </h1>
          <p style={{
            fontFamily: "Jost, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(61,43,43,0.45)",
            fontWeight: 300,
          }}>
            Natural products for your everyday glow
          </p>
        </div>

        {/* Category filters */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.5rem 1.25rem",
                border: "1px solid rgba(61,43,43,0.2)",
                background: activeCategory === cat ? "#3d2b2b" : "transparent",
                color: activeCategory === cat ? "#fff" : "rgba(61,43,43,0.6)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product count */}
        <p style={{
          fontFamily: "Jost, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(61,43,43,0.35)",
          marginBottom: "2rem",
        }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Thin divider */}
        <div style={{ borderTop: "1px solid rgba(61,43,43,0.08)", marginBottom: "2.5rem" }} />

        {/* Product grid — 4 columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem 1.5rem",
        }}>
          {filtered.map((p) => (
            <ShopProductCard key={p._id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, color: "rgba(61,43,43,0.3)", marginBottom: "1rem" }}>
              Nothing here yet
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c97b84", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
              View all products
            </button>
          </div>
        )}

      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 900px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .shop-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
      `}</style>
    </>
  );
}