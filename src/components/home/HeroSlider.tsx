"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    image: "/images/sheabutter.jpg",
    tag: "New Arrivals",
    headline: "Glow\nNaturally",
    sub: "Pure shea butter and botanical oils, crafted to nourish every skin tone.",
    cta: "Shop Skincare",
    href: "/shop",
    bg: "#fdf8f5",
    accent: "#c97b84",
  },
  {
    image: "/images/conditioners.jpg",
    tag: "Hair Collection",
    headline: "Feed\nYour Hair",
    sub: "Cold-pressed oils and deep conditioners made for African hair textures.",
    cta: "Shop Hair Care",
    href: "/shop",
    bg: "#f7e8e8",
    accent: "#8b6f6f",
  },
  {
    image: "/images/scrub.jpg",
    tag: "Best Sellers",
    headline: "Feel\nThe Difference",
    sub: "No chemicals. No shortcuts. Just nature, bottled for you.",
    cta: "Shop Now",
    href: "/shop",
    bg: "#f2ede8",
    accent: "#c97b84",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <>
      <style>{`
        .hero-section {
          width: 100%;
          transition: background 0.8s ease;
          overflow: hidden;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 88vh;
          max-width: 100%;
        }
        .hero-image-side {
          position: relative;
          overflow: hidden;
          min-height: 88vh;
        }
        .hero-text-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 5rem;
        }
        .hero-headline {
          font-family: Cormorant Garamond, serif;
          font-weight: 300;
          color: #3d2b2b;
          line-height: 1;
          margin-bottom: 1.5rem;
          font-size: clamp(3rem, 6vw, 6rem);
          white-space: pre-line;
        }
        .hero-sub {
          font-family: Jost, sans-serif;
          font-weight: 300;
          color: rgba(61,43,43,0.6);
          line-height: 1.9;
          margin-bottom: 2.5rem;
          font-size: 0.95rem;
          max-width: 26rem;
        }
        .hero-tag {
          font-family: Jost, sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .hero-btns {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .hero-cta {
          font-family: Jost, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.85rem 2rem;
          border: 1px solid #3d2b2b;
          color: #3d2b2b;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
        }
        .hero-cta:hover { background: #3d2b2b; color: #fff; }
        .hero-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 3rem;
        }
        .hero-dot {
          height: 2px;
          border: none;
          cursor: pointer;
          transition: all 0.4s;
          padding: 0;
        }

        /* Mobile hero */
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hero-image-side {
            min-height: 55vw;
            height: 60vw;
          }
          .hero-text-side {
            padding: 2rem 1.5rem 2.5rem;
          }
          .hero-headline { font-size: clamp(2.2rem, 8vw, 3.5rem); }
          .hero-sub { font-size: 0.85rem; max-width: 100%; }
          .hero-dots { margin-top: 1.5rem; }
        }
        @media (max-width: 480px) {
          .hero-image-side { height: 70vw; }
          .hero-text-side { padding: 1.5rem 1rem 2rem; }
        }
      `}</style>

      <section className="hero-section" style={{ background: slide.bg }}>
        <div className="hero-inner">

          {/* Image */}
          <div className="hero-image-side">
            <AnimatePresence mode="wait">
              <motion.img
                key={current + "-img"}
                src={slide.image}
                alt={slide.tag}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </AnimatePresence>
          </div>

          {/* Text */}
          <div className="hero-text-side">
            <AnimatePresence mode="wait">
              <motion.div
                key={current + "-text"}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, delay: 0.15 }}>

                <p className="hero-tag" style={{ color: slide.accent }}>{slide.tag}</p>
                <h1 className="hero-headline">{slide.headline}</h1>
                <p className="hero-sub">{slide.sub}</p>

                <div className="hero-btns">
                  <Link href={slide.href} className="hero-cta">{slide.cta}</Link>
                  <Link href="/shop" style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: slide.accent, textDecoration: "none" }}>
                    View All →
                  </Link>
                </div>

                <div className="hero-dots">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className="hero-dot"
                      style={{ width: i === current ? "2.5rem" : "0.6rem", background: i === current ? slide.accent : "#d1c4c4" }}
                    />
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}