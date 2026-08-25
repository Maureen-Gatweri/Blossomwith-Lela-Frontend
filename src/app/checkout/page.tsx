"use client";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { createOrder, initiateMpesaPayment, checkPaymentStatus } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const [step, setStep] = useState<"details" | "payment" | "waiting" | "success">("details");
  const [orderId, setOrderId] = useState("");
  const [receipt, setReceipt] = useState("");
  const [phone, setPhone] = useState("");
  const [polling, setPolling] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "Nairobi",
    phone: "",
  });

  const deliveryFee = total() >= 2000 ? 0 : 200;
  const grandTotal = total() + deliveryFee;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to checkout");
      router.push("/auth/login");
    }
  }, [user]);

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0 && step !== "success") {
      router.push("/cart");
    }
  }, [items]);

  // Poll payment status
  useEffect(() => {
    if (step === "waiting" && orderId && user) {
      setPolling(true);
      let attempts = 0;
      const maxAttempts = 24; // 2 minutes

      pollRef.current = setInterval(async () => {
        attempts++;
        try {
          const status = await checkPaymentStatus(orderId, user.token);
          if (status.paymentStatus === "paid") {
            clearInterval(pollRef.current!);
            setPolling(false);
            setReceipt(status.mpesaReceiptNumber || "");
            clearCart();
            setStep("success");
          } else if (status.paymentStatus === "failed") {
            clearInterval(pollRef.current!);
            setPolling(false);
            toast.error("Payment was cancelled or failed. Please try again.");
            setStep("payment");
          } else if (attempts >= maxAttempts) {
            clearInterval(pollRef.current!);
            setPolling(false);
            toast.error("Payment timed out. Please check your M-Pesa and try again.");
            setStep("payment");
          }
        } catch (err) {
          console.error("Poll error:", err);
        }
      }, 5000);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [step, orderId]);

  const handleDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep("payment");
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Enter your M-Pesa phone number");
      return;
    }

    try {
      toast.loading("Creating your order...", { id: "order" });

      // 1. Create order in DB
      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.images?.[0] || "",
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryAddress: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
        paymentMethod: "mpesa",
        totalAmount: total(),
        deliveryFee,
      };

      const order = await createOrder(orderData, user!.token);
      setOrderId(order._id);
      toast.dismiss("order");

      // 2. Initiate STK push
      toast.loading("Sending payment prompt...", { id: "stk" });
      await initiateMpesaPayment(phone, order._id, user!.token);
      toast.dismiss("stk");
      toast.success("Check your phone for the M-Pesa prompt!");

      setStep("waiting");
    } catch (err: any) {
      toast.dismiss("order");
      toast.dismiss("stk");
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  // ── SUCCESS screen ──
  if (step === "success") {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <Toaster position="top-right" />
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f0fdf4", border: "2px solid #16a34a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", fontSize: "1.5rem" }}>
          ✓
        </div>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.75rem" }}>Order Confirmed</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#3d2b2b", marginBottom: "1rem", fontStyle: "italic" }}>
          Thank you, {form.name.split(" ")[0]}!
        </h1>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.85rem", color: "rgba(61,43,43,0.55)", maxWidth: "400px", lineHeight: 1.8, fontWeight: 300, marginBottom: "0.75rem" }}>
          Your payment was successful and your order is confirmed. We will send a confirmation to <strong>{form.email}</strong>.
        </p>
        {receipt && (
          <div style={{ background: "#f7e8e8", border: "1px solid rgba(201,123,132,0.25)", padding: "0.85rem 1.5rem", marginBottom: "2rem", borderRadius: "2px" }}>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)", marginBottom: "0.25rem" }}>M-Pesa Receipt</p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "1rem", fontWeight: 500, color: "#3d2b2b", letterSpacing: "0.08em" }}>{receipt}</p>
          </div>
        )}
        <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", padding: "0.9rem 2.5rem", textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ── WAITING screen ──
  if (step === "waiting") {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <Toaster position="top-right" />
        <div style={{ width: "56px", height: "56px", border: "3px solid #eecece", borderTopColor: "#c97b84", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "2rem" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "0.75rem" }}>Waiting for Payment</p>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.82rem", color: "rgba(61,43,43,0.55)", maxWidth: "360px", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>
          Check your phone <strong>{phone}</strong> and enter your M-Pesa PIN to complete the payment of <strong>KSh {grandTotal.toLocaleString()}</strong>.
        </p>
        <div style={{ background: "#fdf8f5", border: "1px solid rgba(61,43,43,0.1)", padding: "1.25rem 2rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "rgba(61,43,43,0.5)", marginBottom: "0.5rem" }}>
            Paying to: <strong style={{ color: "#3d2b2b" }}>Blossom with Lela</strong>
          </p>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "rgba(61,43,43,0.5)" }}>
            Till No: <strong style={{ color: "#3d2b2b" }}>5509307</strong>
          </p>
        </div>
        <button
          onClick={() => { if (pollRef.current) clearInterval(pollRef.current); setStep("payment"); }}
          style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.4)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
          Cancel and try again
        </button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .co-wrap { max-width: 1100px; margin: 0 auto; padding: 2rem 1.25rem 5rem; }
        @media (min-width: 768px) { .co-wrap { padding: 3rem 2rem 6rem; } }
        .co-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: start; }
        @media (max-width: 768px) { .co-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .co-input { width: 100%; border: 1px solid rgba(61,43,43,0.2); padding: 0.78rem 1rem; font-family: Jost, sans-serif; font-size: 0.85rem; color: #3d2b2b; outline: none; box-sizing: border-box; background: #fff; transition: border-color 0.2s; }
        .co-input:focus { border-color: #c97b84; }
        .co-label { font-family: Jost, sans-serif; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(61,43,43,0.5); display: block; margin-bottom: 0.4rem; }
        .co-btn { width: 100%; background: #3d2b2b; color: #fff; font-family: Jost, sans-serif; font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 1rem; border: none; cursor: pointer; transition: opacity 0.2s; }
        .co-btn:hover { opacity: 0.85; }
        .co-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className="co-wrap">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.6rem" }}>
            Almost there
          </p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 300, color: "#3d2b2b", fontStyle: "italic" }}>
            Checkout
          </h1>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
            {["Delivery", "Payment"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: (step === "details" && i === 0) || (step === "payment" && i === 1) ? "#3d2b2b" : "rgba(61,43,43,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.55rem", color: (step === "details" && i === 0) || (step === "payment" && i === 1) ? "#fff" : "rgba(61,43,43,0.4)" }}>{i + 1}</span>
                  </div>
                  <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: (step === "details" && i === 0) || (step === "payment" && i === 1) ? "#3d2b2b" : "rgba(61,43,43,0.3)" }}>{s}</span>
                </div>
                {i < 1 && <div style={{ width: "2.5rem", height: "1px", background: "rgba(61,43,43,0.15)" }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="co-grid">

          {/* LEFT — Form */}
          <div>

            {/* STEP 1 — Delivery details */}
            {step === "details" && (
              <form onSubmit={handleDetails}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.5rem" }}>
                  Delivery Details
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="co-label">Full Name</label>
                    <input className="co-input" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Wanjiru" required />
                  </div>
                  <div>
                    <label className="co-label">Email Address</label>
                    <input className="co-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" required />
                  </div>
                  <div>
                    <label className="co-label">Phone Number</label>
                    <input className="co-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07XX XXX XXX" required />
                  </div>
                  <div>
                    <label className="co-label">Delivery Address</label>
                    <input className="co-input" type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, Estate, Building No." required />
                  </div>
                  <div>
                    <label className="co-label">City</label>
                    <select className="co-input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={{ appearance: "none" }}>
                      {["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Other"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="co-btn" style={{ marginTop: "1.5rem" }}>
                  Continue to Payment →
                </button>
                <Link href="/cart" style={{ display: "block", textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.35)", textDecoration: "underline", marginTop: "1rem" }}>
                  ← Back to Cart
                </Link>
              </form>
            )}

            {/* STEP 2 — Payment */}
            {step === "payment" && (
              <form onSubmit={handlePayment}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.5rem" }}>
                  M-Pesa Payment
                </h2>

                {/* Till info card */}
                <div style={{ background: "#f7e8e8", border: "1px solid rgba(201,123,132,0.25)", padding: "1.25rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)" }}>Business Name</span>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3d2b2b", fontWeight: 500 }}>Blossom with Lela</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)" }}>Till Number</span>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "1.1rem", color: "#3d2b2b", fontWeight: 500, letterSpacing: "0.08em" }}>5509307</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)" }}>Amount</span>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", color: "#3d2b2b", fontWeight: 400 }}>KSh {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="co-label">M-Pesa Phone Number</label>
                  <input
                    className="co-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    required
                  />
                  <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", color: "rgba(61,43,43,0.4)", marginTop: "0.4rem", fontWeight: 300 }}>
                    You'll receive a prompt on this number to enter your PIN.
                  </p>
                </div>

                <button type="submit" className="co-btn">
                  Pay KSh {grandTotal.toLocaleString()} via M-Pesa
                </button>

                <button type="button" onClick={() => setStep("details")}
                  style={{ width: "100%", background: "none", border: "none", fontFamily: "Jost, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.35)", cursor: "pointer", textDecoration: "underline", padding: "0.75rem 0", marginTop: "0.5rem" }}>
                  ← Back to Details
                </button>
              </form>
            )}

          </div>

          {/* RIGHT — Order summary */}
          <div style={{ background: "#fdf8f5", padding: "1.5rem", position: "sticky", top: "calc(var(--navbar-height) + 1rem)" }}>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.25rem" }}>
              Order Summary
            </h3>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(61,43,43,0.08)" }}>
              {items.map((item) => (
                <div key={item._id} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ width: "52px", height: "52px", flexShrink: 0, overflow: "hidden", background: "#f0ece8" }}>
                    <img src={item.images?.[0] || "/images/sheabutter.jpg"} alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#3d2b2b", marginBottom: "0.15rem" }}>
                      {item.name}
                    </p>
                    <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", color: "rgba(61,43,43,0.4)", fontWeight: 300 }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.72rem", color: "#3d2b2b", fontWeight: 400, flexShrink: 0 }}>
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(61,43,43,0.45)" }}>Subtotal</span>
                <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "#3d2b2b" }}>KSh {total().toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(61,43,43,0.45)" }}>Delivery</span>
                <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: deliveryFee === 0 ? "#16a34a" : "#3d2b2b" }}>
                  {deliveryFee === 0 ? "Free" : `KSh ${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", color: "#c97b84", fontWeight: 300 }}>
                  Add KSh {(2000 - total()).toLocaleString()} more for free delivery
                </p>
              )}
              <div style={{ borderTop: "1px solid rgba(61,43,43,0.1)", paddingTop: "0.75rem", marginTop: "0.25rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: "#3d2b2b", fontStyle: "italic" }}>Total</span>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", color: "#3d2b2b" }}>KSh {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}