"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  const deliveryFee = total() >= 2000 ? 0 : 200;
  const grandTotal = total() + deliveryFee;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c97b84" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1.5rem" }}>
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "0.75rem" }}>
          Your cart is empty
        </h2>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.82rem", color: "rgba(61,43,43,0.45)", marginBottom: "2rem", fontWeight: 300 }}>
          Add something beautiful to get started
        </p>
        <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", padding: "0.85rem 2.5rem", textDecoration: "none" }}>
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "950px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.5rem" }}>
          Review your order
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300, color: "#3d2b2b" }}>
          Your Cart
        </h1>
        <div style={{ width: "2rem", height: "1px", background: "rgba(61,43,43,0.15)", margin: "0.75rem auto 0" }} />
      </div>

      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 0.8fr 1fr 0.8fr 0.4fr",
        gap: "1rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid rgba(61,43,43,0.1)",
        marginBottom: "0.25rem",
      }}>
        {["Product", "Price", "Quantity", "Total", ""].map((h) => (
          <p key={h} style={{ fontFamily: "Jost, sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(61,43,43,0.3)", textAlign: h === "Price" || h === "Total" ? "center" : "left" }}>
            {h}
          </p>
        ))}
      </div>

      {/* Cart items */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item) => (
          <div key={item._id} style={{
            display: "grid",
            gridTemplateColumns: "2fr 0.8fr 1fr 0.8fr 0.4fr",
            gap: "1rem",
            alignItems: "center",
            padding: "1.25rem 0",
            borderBottom: "1px solid rgba(61,43,43,0.06)",
          }}>

            {/* Product — tiny image + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{ width: "54px", height: "54px", flexShrink: 0, overflow: "hidden", background: "#f7f5f2" }}>
                {item.images?.[0]
                  ? <img src={item.images[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🌸</div>
                }
              </div>
              <div>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3d2b2b", marginBottom: "0.2rem", fontWeight: 500 }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", color: "rgba(61,43,43,0.38)", fontWeight: 300 }}>
                  {item.category}
                </p>
              </div>
            </div>

            {/* Unit price */}
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3d2b2b", textAlign: "center", fontWeight: 300 }}>
              KSh {item.price.toLocaleString()}
            </p>

            {/* Quantity controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(61,43,43,0.15)" }}>
              <button
                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                style={{ width: "30px", height: "30px", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#3d2b2b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                −
              </button>
              <span style={{ width: "30px", textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3d2b2b", borderLeft: "1px solid rgba(61,43,43,0.1)", borderRight: "1px solid rgba(61,43,43,0.1)", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                style={{ width: "30px", height: "30px", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#3d2b2b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                +
              </button>
            </div>

            {/* Line total */}
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3d2b2b", textAlign: "center", fontWeight: 500 }}>
              KSh {(item.price * item.quantity).toLocaleString()}
            </p>

            {/* Remove */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => removeItem(item._id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(61,43,43,0.25)", padding: "0.25rem", lineHeight: 1 }}
                title="Remove item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "2.5rem", alignItems: "start" }}>

        {/* Left — continue shopping */}
        <div style={{ paddingTop: "0.5rem" }}>
          <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.35)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            ← Continue Shopping
          </Link>

          {/* Free delivery note */}
          {total() < 2000 && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#fdf8f5", borderLeft: "2px solid #c97b84" }}>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "rgba(61,43,43,0.6)", fontWeight: 300, lineHeight: 1.6 }}>
                Add <strong>KSh {(2000 - total()).toLocaleString()}</strong> more to qualify for free delivery within Nairobi.
              </p>
            </div>
          )}
          {total() >= 2000 && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f0fdf4", borderLeft: "2px solid #16a34a" }}>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "#16a34a", fontWeight: 300 }}>
                ✓ You qualify for free delivery!
              </p>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        <div style={{ background: "#fdf8f5", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.65rem" }}>
            <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(61,43,43,0.45)" }}>Subtotal</span>
            <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3d2b2b" }}>KSh {total().toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(61,43,43,0.45)" }}>Delivery</span>
            <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: deliveryFee === 0 ? "#16a34a" : "#3d2b2b" }}>
              {deliveryFee === 0 ? "Free" : `KSh ${deliveryFee}`}
            </span>
          </div>
          <div style={{ borderTop: "1px solid rgba(61,43,43,0.1)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: "#3d2b2b", fontStyle: "italic" }}>Total</span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", color: "#3d2b2b", fontWeight: 400 }}>
              KSh {grandTotal.toLocaleString()}
            </span>
          </div>
          <Link href="/checkout" style={{
            display: "block",
            width: "100%",
            background: "#3d2b2b",
            color: "#fff",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "1rem",
            textAlign: "center",
            textDecoration: "none",
            boxSizing: "border-box",
          }}>
            Proceed to Checkout →
          </Link>
        </div>

      </div>
    </div>
  );
}