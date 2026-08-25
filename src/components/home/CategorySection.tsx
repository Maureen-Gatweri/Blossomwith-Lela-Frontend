"use client";
import Link from "next/link";

const categories = [
  { name: "Skin Care", sub: "Lotions, Oils & Serums", href: "/shop", image: "/images/sheabutter.jpg" },
  { name: "Hair Care", sub: "Masks, Oils & Treatments", href: "/shop", image: "/images/conditioners.jpg" },
  { name: "Body & Soap", sub: "Bars, Scrubs & Butters", href: "/shop", image: "/images/scrub.jpg" },
];

export default function CategorySection() {
  return (
    <>
      <style>{`
        .cat-section { padding: 3rem 1.25rem 4rem; max-width: 1200px; margin: 0 auto; box-sizing: border-box; }
        @media (min-width: 768px) { .cat-section { padding: 4rem 2rem 5rem; } }
        .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .cat-grid { grid-template-columns: 1fr; gap: 1rem; } }
        .cat-card { display: block; text-decoration: none; overflow: hidden; cursor: pointer; }
        .cat-img-wrap { width: 100%; aspect-ratio: 4/5; overflow: hidden; position: relative; background: #f0ece8; }
        @media (max-width: 560px) { .cat-img-wrap { aspect-ratio: 16/9; } }
        .cat-img-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform 0.6s ease; }
        .cat-card:hover .cat-img-wrap img { transform: scale(1.04); }
        .cat-overlay { position: absolute; inset: 0; background: rgba(61,43,43,0); transition: background 0.3s ease; }
        .cat-card:hover .cat-overlay { background: rgba(61,43,43,0.08); }
        .cat-text { padding: 1rem 0 0.5rem; }
        .cat-name { font-family: Cormorant Garamond, serif; font-size: clamp(1.1rem, 2.5vw, 1.4rem); font-weight: 300; color: #3d2b2b; margin-bottom: 0.25rem; }
        .cat-sub { font-family: Jost, sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(61,43,43,0.4); margin-bottom: 0.5rem; }
        .cat-cta { font-family: Jost, sans-serif; font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: #c97b84; }
      `}</style>

      <section className="cat-section">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c97b84", marginBottom: "0.6rem" }}>Browse</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, color: "#3d2b2b" }}>Shop by Category</h2>
        </div>

        <div className="cat-grid">
          {categories.map((c) => (
            <Link href={c.href} key={c.name} className="cat-card">
              <div className="cat-img-wrap">
                <img src={c.image} alt={c.name} />
                <div className="cat-overlay" />
              </div>
              <div className="cat-text">
                <p className="cat-name">{c.name}</p>
                <p className="cat-sub">{c.sub}</p>
                <p className="cat-cta">Shop Now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}