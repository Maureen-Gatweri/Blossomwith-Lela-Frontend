"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AccountPage() {
  const { user, setUser, logout } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<"profile" | "orders">("profile");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  useEffect(() => {
    if (tab === "orders" && user) {
      fetchOrders();
    }
  }, [tab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`${API_URL}/orders/myorders`, {
        headers: { Authorization: `Bearer ${user!.token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error("Could not load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password && form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      const body: any = { name: form.name, email: form.email };
      if (form.phone) body.phone = form.phone;
      if (form.address) body.address = form.address;
      if (form.password) body.password = form.password;

      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user!.token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUser(data);
      toast.success("Profile updated!");
      setForm((f) => ({ ...f, password: "", confirmPassword: "" }));
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    toast.success("Logged out!");
  };

  if (!user) return null;

  const statusColor: Record<string, string> = {
    processing: "#f59e0b",
    confirmed: "#3b82f6",
    shipped: "#8b5cf6",
    delivered: "#16a34a",
    cancelled: "#ef4444",
  };

  return (
    <>
      <Toaster position="top-right" />
      <style>{`
        .acc-wrap { max-width: 1000px; margin: 0 auto; padding: 2rem 1.25rem 5rem; }
        @media (min-width: 768px) { .acc-wrap { padding: 3rem 2rem 6rem; } }
        .acc-grid { display: grid; grid-template-columns: 240px 1fr; gap: 3rem; align-items: start; }
        @media (max-width: 768px) { .acc-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
        .acc-input { width: 100%; border: 1px solid rgba(61,43,43,0.2); padding: 0.75rem 1rem; font-family: Jost, sans-serif; font-size: 0.85rem; color: #3d2b2b; outline: none; box-sizing: border-box; background: #fff; transition: border-color 0.2s; }
        .acc-input:focus { border-color: #c97b84; }
        .acc-label { font-family: Jost, sans-serif; font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(61,43,43,0.5); display: block; margin-bottom: 0.4rem; }
        .acc-tab { font-family: Jost, sans-serif; font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(61,43,43,0.5); background: none; border: none; cursor: pointer; padding: 0.85rem 0; border-bottom: 2px solid transparent; display: block; width: 100%; text-align: left; transition: all 0.2s; }
        .acc-tab.active { color: #3d2b2b; border-bottom-color: #3d2b2b; }
        .acc-tab:hover { color: #c97b84; }
      `}</style>

      <div className="acc-wrap">
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.5rem" }}>My Account</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 300, color: "#3d2b2b" }}>
            Welcome, {user.name.split(" ")[0]}
          </h1>
        </div>

        <div className="acc-grid">

          {/* Sidebar */}
          <div>
            <div style={{ background: "#f7e8e8", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#eecece", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "#3d2b2b", fontStyle: "italic" }}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "#3d2b2b", fontWeight: 500, marginBottom: "0.2rem" }}>{user.name}</p>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.7rem", color: "rgba(61,43,43,0.5)", fontWeight: 300 }}>{user.email}</p>
            </div>

            <button className={`acc-tab ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>Profile Settings</button>
            <button className={`acc-tab ${tab === "orders" ? "active" : ""}`} onClick={() => setTab("orders")}>My Orders</button>

            <div style={{ borderTop: "1px solid rgba(61,43,43,0.08)", marginTop: "1rem", paddingTop: "1rem" }}>
              <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(61,43,43,0.45)", textDecoration: "none", display: "block", marginBottom: "0.75rem" }}>
                → Continue Shopping
              </Link>
              <button onClick={handleLogout} style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c97b84", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                → Logout
              </button>
            </div>
          </div>

          {/* Main content */}
          <div>

            {/* Profile tab */}
            {tab === "profile" && (
              <form onSubmit={handleSave}>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.5rem" }}>
                  Profile Settings
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label className="acc-label">Full Name</label>
                    <input className="acc-input" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Wanjiru" />
                  </div>
                  <div>
                    <label className="acc-label">Email</label>
                    <input className="acc-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="acc-label">Phone Number</label>
                    <input className="acc-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="07XX XXX XXX" />
                  </div>
                  <div>
                    <label className="acc-label">Default Delivery Address</label>
                    <input className="acc-input" type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, Estate, Building" />
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(61,43,43,0.08)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1rem" }}>Change Password</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label className="acc-label">New Password</label>
                      <input className="acc-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to keep current" />
                    </div>
                    <div>
                      <label className="acc-label">Confirm Password</label>
                      <input className="acc-input" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Confirm new password" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={saving}
                  style={{ background: "#3d2b2b", color: "#fff", fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.9rem 2.5rem", border: "none", cursor: "pointer", opacity: saving ? 0.6 : 1 }}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}

            {/* Orders tab */}
            {tab === "orders" && (
              <div>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.5rem" }}>
                  My Orders
                </h2>
                {loadingOrders ? (
                  <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.4)" }}>Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 0" }}>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300, color: "rgba(61,43,43,0.3)", marginBottom: "1rem" }}>No orders yet</p>
                    <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid #3d2b2b", color: "#3d2b2b", padding: "0.75rem 2rem", textDecoration: "none" }}>
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {orders.map((order: any) => (
                      <div key={order._id} style={{ border: "1px solid rgba(61,43,43,0.1)", padding: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                          <div>
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(61,43,43,0.4)", marginBottom: "0.2rem" }}>
                              Order #{order._id.slice(-6).toUpperCase()}
                            </p>
                            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.68rem", color: "rgba(61,43,43,0.5)", fontWeight: 300 }}>
                              {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.6rem", background: `${statusColor[order.status]}18`, color: statusColor[order.status] || "#3d2b2b", border: `1px solid ${statusColor[order.status]}40` }}>
                              {order.status}
                            </span>
                            <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.6rem", background: order.paymentStatus === "paid" ? "#f0fdf4" : "#fef3f2", color: order.paymentStatus === "paid" ? "#16a34a" : "#ef4444", border: `1px solid ${order.paymentStatus === "paid" ? "#16a34a" : "#ef4444"}40` }}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order items */}
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                          {order.items?.slice(0, 4).map((item: any, i: number) => (
                            <div key={i} style={{ width: "44px", height: "44px", overflow: "hidden", background: "#f7f5f2", flexShrink: 0 }}>
                              <img src={item.image || "/images/sheabutter.jpg"} alt={item.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                          ))}
                          {order.items?.length > 4 && (
                            <div style={{ width: "44px", height: "44px", background: "#f0ece8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", color: "rgba(61,43,43,0.5)" }}>+{order.items.length - 4}</span>
                            </div>
                          )}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            {order.mpesaReceiptNumber && (
                              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", color: "rgba(61,43,43,0.4)", fontWeight: 300 }}>
                                Receipt: {order.mpesaReceiptNumber}
                              </p>
                            )}
                          </div>
                          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontWeight: 300, color: "#3d2b2b" }}>
                            KSh {(order.totalAmount + order.deliveryFee).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}