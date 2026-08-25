"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root { background: #f0eeeb; padding-top: 4rem; padding-bottom: 3rem; }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.5fr;
          gap: 2rem;
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; padding: 0 1.5rem; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; padding: 0 1.25rem; } }
        .footer-heading {
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d2b2b;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .footer-link {
          font-family: Jost, sans-serif;
          font-size: 0.85rem;
          color: rgba(61,43,43,0.65);
          text-decoration: none;
          font-weight: 300;
          display: block;
          margin-bottom: 0.9rem;
        }
        .footer-link:hover { color: #c97b84; }
        .footer-bottom {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding: 1.5rem 2rem 0;
          border-top: 1px solid rgba(61,43,43,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 560px) {
          .footer-bottom { padding: 1.25rem 1.25rem 0; flex-direction: column; text-align: center; }
        }
        .footer-input {
          width: 100%;
          border: 1px solid rgba(61,43,43,0.2);
          background: transparent;
          padding: 0.75rem 1rem;
          font-family: Jost, sans-serif;
          font-size: 0.8rem;
          color: #3d2b2b;
          outline: none;
          margin-bottom: 0.75rem;
          box-sizing: border-box;
        }
        .footer-subscribe-btn {
          width: 100%;
          background: #f0eeeb;
          border: 1px solid rgba(61,43,43,0.3);
          color: #3d2b2b;
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.85rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }
        .footer-subscribe-btn:hover { background: #3d2b2b; color: #fff; }
      `}</style>

      <footer className="footer-root">
        <div className="footer-grid">

          {/* Explore */}
          <div>
            <p className="footer-heading">Explore</p>
            {[{ label: "Shop All", href: "/shop" }, { label: "Lotions", href: "/shop" }, { label: "Hair Care", href: "/shop" }, { label: "Soaps & Scrubs", href: "/shop" }, { label: "About Us", href: "/about" }].map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>

          {/* Customer Care */}
          <div>
            <p className="footer-heading">Customer Care</p>
            {["Refund & Return Policy", "Privacy Policy", "Terms of Service", "Shipping Policy"].map((l) => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Connect */}
          <div>
            <p className="footer-heading">Connect With Us</p>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", marginBottom: "1.5rem" }}>
              {[
                { label: "Facebook", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: "Instagram", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              ].map((s) => (
                <a key={s.label} href="#" style={{ color: "rgba(61,43,43,0.6)", textDecoration: "none" }}>{s.svg}</a>
              ))}
            </div>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.5)", fontWeight: 300, lineHeight: 1.7 }}>📍 Nairobi, Kenya</p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.8rem", color: "rgba(61,43,43,0.5)", fontWeight: 300, marginTop: "0.4rem" }}>📧 hello@blossomwithlela.com</p>
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-heading">Newsletter</p>
            <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.82rem", color: "rgba(61,43,43,0.55)", fontWeight: 300, lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <input type="email" placeholder="Enter your email address" className="footer-input" />
            <button className="footer-subscribe-btn">Subscribe</button>
          </div>

        </div>

        <div className="footer-bottom">
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.72rem", color: "rgba(61,43,43,0.4)", fontWeight: 300 }}>
            © {new Date().getFullYear()} Blossom with Lela. All rights reserved.
          </p>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.9rem", color: "rgba(61,43,43,0.3)", fontStyle: "italic" }}>
            Blossom with Lela
          </p>
        </div>
      </footer>
    </>
  );
}