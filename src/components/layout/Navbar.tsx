"use client";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const count = useCartStore((s) => s.count());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
      setOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "New In", href: "/shop" },
    { label: "Best Sellers", href: "/shop" },
    { label: "Bundles", href: "/shop" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #fff;
          box-shadow: 0 1px 0 rgba(61,43,43,0.07);
        }
        .nav-announce {
          background: #fff;
          text-align: center;
          padding: 0.4rem 1rem;
          font-family: Jost, sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(61,43,43,0.5);
          border-bottom: 1px solid rgba(61,43,43,0.06);
        }
        .nav-main {
          padding: 0.85rem 2rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          border-bottom: 1px solid rgba(61,43,43,0.07);
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nav-desktop-btns {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nav-text-link {
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(61,43,43,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-text-link:hover { color: #c97b84; }
        .nav-text-btn {
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(61,43,43,0.55);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .nav-text-btn:hover { color: #c97b84; }
        .nav-user-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #f7e8e8;
          border: 1px solid rgba(201,123,132,0.25);
          border-radius: 2rem;
          padding: 0.25rem 0.7rem;
          text-decoration: none;
        }
        .nav-user-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c97b84;
        }
        .nav-user-name {
          font-family: Jost, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3d2b2b;
        }
        .nav-search-form {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          border-bottom: 1px solid rgba(61,43,43,0.18);
          padding-bottom: 1px;
        }
        .nav-search-input {
          border: none;
          background: transparent;
          font-family: Jost, sans-serif;
          font-size: 0.62rem;
          color: #3d2b2b;
          outline: none;
          width: 90px;
          padding: 0.1rem 0;
        }
        .nav-search-input::placeholder { color: rgba(61,43,43,0.35); }
        .nav-search-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(61,43,43,0.45);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .nav-search-btn:hover { color: #c97b84; }
        .nav-logo {
          font-family: Cormorant Garamond, serif;
          font-size: 1.85rem;
          font-style: italic;
          font-weight: 300;
          color: #3d2b2b;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
        }
        .nav-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
        }
        .nav-cart-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          color: rgba(61,43,43,0.6);
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          position: relative;
        }
        .nav-cart-icon-wrap { position: relative; }
        .nav-cart-count {
          position: absolute;
          top: -7px;
          right: -7px;
          background: #c97b84;
          color: #fff;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          font-size: 0.45rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.2rem;
          align-items: center;
        }
        /* Pink nav bar */
        .nav-pink {
          background: #eecece;
          border-bottom: 1px solid rgba(61,43,43,0.08);
        }
        .nav-pink-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .nav-pink-link {
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #3d2b2b;
          text-decoration: none;
          padding: 0.78rem 1.4rem;
          display: block;
          transition: opacity 0.2s;
        }
        .nav-pink-link:hover { opacity: 0.5; }
        /* Overlay */
        .nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(61,43,43,0.3);
          z-index: 1998;
          backdrop-filter: blur(3px);
        }
        .nav-overlay.active { display: block; }
        /* Drawer */
        .nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 78vw;
          max-width: 300px;
          background: #fff;
          z-index: 1999;
          display: flex;
          flex-direction: column;
          box-shadow: 6px 0 30px rgba(61,43,43,0.12);
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
        }
        .nav-drawer.active { transform: translateX(0); }
        .nav-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.4rem;
          border-bottom: 1px solid rgba(61,43,43,0.07);
        }
        .nav-drawer-logo {
          font-family: Cormorant Garamond, serif;
          font-size: 1.2rem;
          font-style: italic;
          color: #3d2b2b;
          text-decoration: none;
        }
        .nav-drawer-search {
          margin: 0.75rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgba(61,43,43,0.15);
          padding: 0.5rem 0.75rem;
          background: #fdf8f5;
        }
        .nav-drawer-search input {
          border: none;
          background: transparent;
          font-family: Jost, sans-serif;
          font-size: 0.75rem;
          color: #3d2b2b;
          outline: none;
          flex: 1;
        }
        .nav-drawer-search input::placeholder { color: rgba(61,43,43,0.35); }
        .nav-drawer-user {
          margin: 0 1.4rem 0.5rem;
          padding: 0.85rem 1rem;
          background: #f7e8e8;
          border: 1px solid rgba(201,123,132,0.18);
        }
        .nav-drawer-user-name {
          font-family: Jost, sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3d2b2b;
          margin-bottom: 0.2rem;
        }
        .nav-drawer-user-email {
          font-family: Jost, sans-serif;
          font-size: 0.62rem;
          color: rgba(61,43,43,0.4);
          font-weight: 300;
        }
        .nav-drawer-links {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1.4rem;
        }
        .nav-drawer-link {
          font-family: Jost, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(61,43,43,0.7);
          text-decoration: none;
          padding: 0.92rem 0;
          border-bottom: 1px solid rgba(61,43,43,0.06);
          display: block;
          transition: color 0.2s;
        }
        .nav-drawer-link:hover { color: #c97b84; }
        .nav-drawer-bottom {
          margin-top: auto;
          padding: 1.25rem 1.4rem;
          border-top: 1px solid rgba(61,43,43,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .nav-drawer-bot-link {
          font-family: Jost, sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(61,43,43,0.5);
          text-decoration: none;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .nav-drawer-bot-link:hover { color: #c97b84; }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-main { padding: 0.75rem 1.25rem; }
          .nav-desktop-btns { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-pink { display: none !important; }
          .nav-logo { font-size: 1.4rem; }
          .nav-cart-text { display: none; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>

      {/* Fixed header */}
      <header className="nav-root">

        {/* Announcement bar */}
        <div className="nav-announce">
          Free delivery within Nairobi on orders above KSh 2,000
        </div>

        {/* Main row */}
        <div className="nav-main">

          {/* Left */}
          <div className="nav-left">

            {/* Desktop */}
            <div className="nav-desktop-btns">
              {user ? (
                <>
                  <Link href="/account" className="nav-user-chip">
                    <div className="nav-user-dot" />
                    <span className="nav-user-name">{user.name.split(" ")[0]}</span>
                  </Link>
                  <button onClick={handleLogout} className="nav-text-btn">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="nav-text-link">Login</Link>
                  <Link href="/auth/register" className="nav-text-link">Register</Link>
                </>
              )}

              {/* Search form — desktop */}
              <form onSubmit={handleSearch} className="nav-search-form">
                <input
                  name="q"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="nav-search-input"
                />
                <button type="submit" className="nav-search-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* Hamburger — mobile */}
            <button className="nav-hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#3d2b2b" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="17" x2="21" y2="17"/>
              </svg>
            </button>

          </div>

          {/* Logo — center */}
          <Link href="/" className="nav-logo">Blossom with Lela</Link>

          {/* Right — Cart */}
          <div className="nav-right">
            <Link href="/cart" className="nav-cart-link">
              <div className="nav-cart-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {count > 0 && <span className="nav-cart-count">{count}</span>}
              </div>
              <span className="nav-cart-text">Cart ({count})</span>
            </Link>
          </div>

        </div>

        {/* Pink nav bar — desktop only */}
        <nav className="nav-pink">
          <div className="nav-pink-inner">
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} className="nav-pink-link">{l.label}</Link>
            ))}
          </div>
        </nav>

      </header>

      {/* Overlay */}
      <div className={`nav-overlay ${open ? "active" : ""}`} onClick={() => setOpen(false)} />

      {/* Mobile drawer */}
      <div className={`nav-drawer ${open ? "active" : ""}`}>

        <div className="nav-drawer-head">
          <Link href="/" className="nav-drawer-logo" onClick={() => setOpen(false)}>
            Blossom with Lela
          </Link>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3d2b2b" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="nav-drawer-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(61,43,43,0.4)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", color: "#c97b84", fontFamily: "Jost, sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: 0 }}>
            Go
          </button>
        </form>

        {/* User info if logged in */}
        {user && (
          <div className="nav-drawer-user">
            <p className="nav-drawer-user-name">Hi, {user.name.split(" ")[0]} 👋</p>
            <p className="nav-drawer-user-email">{user.email}</p>
          </div>
        )}

        {/* Nav links */}
        <div className="nav-drawer-links">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="nav-drawer-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="nav-drawer-bottom">
          {user ? (
            <>
              <Link href="/account" className="nav-drawer-bot-link" onClick={() => setOpen(false)}>My Account</Link>
              <button onClick={handleLogout} className="nav-drawer-bot-link" style={{ color: "#c97b84" }}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="nav-drawer-bot-link" onClick={() => setOpen(false)}>Login</Link>
              <Link href="/auth/register" className="nav-drawer-bot-link" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
          <Link href="/cart" className="nav-drawer-bot-link" onClick={() => setOpen(false)}>
            Cart {count > 0 ? `(${count})` : ""}
          </Link>
        </div>

      </div>
    </>
  );
}