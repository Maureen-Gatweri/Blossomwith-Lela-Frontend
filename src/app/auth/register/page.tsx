"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      setUser(data);
      toast.success(`Welcome to Blossom, ${data.name}!`);
      router.push("/shop");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: "#fff", border: "1px solid rgba(61,43,43,0.1)", padding: "2.5rem", width: "100%", maxWidth: "400px" }}>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontStyle: "italic", color: "#3d2b2b", marginBottom: "0.5rem" }}>
              Blossom with Lela
            </p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 300, color: "#3d2b2b" }}>
              Create Account
            </h1>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "rgba(61,43,43,0.45)", marginTop: "0.4rem" }}>
              Join the Blossom family today
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)", display: "block", marginBottom: "0.4rem" }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Wanjiru"
                style={{ width: "100%", border: "1px solid rgba(61,43,43,0.2)", padding: "0.75rem 1rem", fontFamily: "Jost, sans-serif", fontSize: "0.85rem", color: "#3d2b2b", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)", display: "block", marginBottom: "0.4rem" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%", border: "1px solid rgba(61,43,43,0.2)", padding: "0.75rem 1rem", fontFamily: "Jost, sans-serif", fontSize: "0.85rem", color: "#3d2b2b", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(61,43,43,0.5)", display: "block", marginBottom: "0.4rem" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                style={{ width: "100%", border: "1px solid rgba(61,43,43,0.2)", padding: "0.75rem 1rem", fontFamily: "Jost, sans-serif", fontSize: "0.85rem", color: "#3d2b2b", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "#3d2b2b", color: "#fff", fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.9rem", border: "none", cursor: "pointer", marginTop: "0.5rem", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontFamily: "Jost, sans-serif", fontSize: "0.78rem", color: "rgba(61,43,43,0.5)", marginTop: "1.5rem" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#c97b84", fontWeight: 500 }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}