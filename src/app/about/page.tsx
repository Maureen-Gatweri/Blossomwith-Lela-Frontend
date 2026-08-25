"use client";
import { useState } from "react";
import Link from "next/link";

const sections = [
  {
    emoji: "🧴",
    category: "Body Lotions",
    color: "#f7e8e8",
    accent: "#c97b84",
    headline: "Skin That Drinks Deep",
    teaser: "Organic body lotions are crafted from nature finest emollients — shea butter, Almonf, Cocoa and botanical oils — working in harmony to restore your skin natural moisture barrier.",
    full: "Unlike conventional lotions packed with synthetic fragrances and petroleum derivatives, organic formulas feed your skin with vitamins, antioxidants and essential fatty acids it actually recognises and absorbs.\n\nThe result? Skin that stays hydrated for hours — not just coated. Organic lotions are free from parabens, sulphates and artificial preservatives, meaning less irritation, fewer breakouts and a healthier long-term relationship with your skin.\n\nRegular use of an organic body lotion helps even out skin tone, soften rough patches on elbows and knees, and leaves a natural luminosity that no synthetic formula can replicate. Your skin is your largest organ — it deserves the same care you give everything else you put in and on your body.",
    benefits: ["Deep 12-hour hydration", "Evens skin tone naturally", "Zero harsh chemicals", "Rich in vitamins A, C & E"],
    image: "/images/almond.jpg",
  },
  {
    emoji: "✨",
    category: "Body Scrubs",
    color: "#f2ede8",
    accent: "#8b6f6f",
    headline: "Reveal Your Radiance",
    teaser: "A good organic body scrub does two things at once — it sloughs away the dull, dead layer sitting on top of your skin and simultaneously feeds the fresh skin underneath with nourishing botanicals.",
    full: "Conventional scrubs often use microplastics or overly harsh synthetic exfoliants that tear at the skin rather than refine it. Organic alternatives use ingredients like raw cane sugar, sea salt, coffee grounds and oat flour — gentle enough to use weekly yet effective enough to transform your skin texture in just a few sessions.\n\nThe oils blended into organic scrubs — think sweet almond, grapeseed or coconut — mean you step out of the shower already moisturised. No tight, stripped feeling. Just soft, glowing skin.\n\nFor anyone dealing with hyperpigmentation, uneven skin tone or keratosis pilaris, a consistent organic scrubbing routine is genuinely one of the most effective natural treatments available.",
    benefits: ["Removes dead skin gently", "Boosts circulation", "Reduces hyperpigmentation", "Leaves skin silky smooth"],
    image: "/images/scrub.jpg",
  },
  {
    emoji: "🌿",
    category: "Shea Butter",
    color: "#fdf8f5",
    accent: "#c97b84",
    headline: "Africa Best Kept Secret",
    teaser: "Raw shea butter has been used across Africa for centuries — and modern science has spent decades confirming what African women have always known: this golden balm is extraordinary.",
    full: "Shea butter is extracted from the nut of the African shea tree and is one of the most nutrient-dense natural moisturisers on the planet. It contains five key fatty acids — oleic, stearic, palmitic, linoleic and arachidonic — that mirror the natural lipids your skin produces.\n\nThis is why shea butter does not just sit on the surface. It actually penetrates into the deeper layers of the dermis, promoting collagen production, soothing inflammation and accelerating the healing of dry patches, stretch marks and minor scars.\n\nUnrefined, raw shea butter retains all of its vitamins A, E and F and its natural anti-inflammatory compounds. It is one of the few ingredients dermatologists recommend for eczema, psoriasis and extremely sensitive skin.",
    benefits: ["Deeply penetrates skin", "Reduces stretch marks", "Anti-inflammatory", "Suitable for sensitive skin"],
    image: "/images/butter.jpg",
  },
  {
    emoji: "💆",
    category: "Hair Products",
    color: "#f7e8e8",
    accent: "#8b6f6f",
    headline: "Hair That Thrives",
    teaser: "Organic hair care works with your hair natural structure rather than stripping it and coating it in silicones that only mimic health. The difference becomes visible within weeks.",
    full: "Most mainstream shampoos and conditioners contain sulphates that strip your scalp of its natural oils, and silicones that create the illusion of moisture while actually suffocating the hair shaft. Over time, this cycle causes breakage, thinning and scalp sensitivity.\n\nOrganic hair products — oils, masks and conditioners made from avocado, castor, coconut, argan and rosehip — deliver real nourishment. They seal the cuticle, reduce protein loss and strengthen hair from the root.\n\nFor 4C and kinky-coily hair textures specifically, organic butters and oils are not optional — they are essential. Our hair naturally loses moisture faster than other textures, and organic products are the only formulas rich enough to keep up.",
    benefits: ["Reduces breakage by 60%", "Promotes healthy growth", "Defines curl patterns", "Nourishes scalp naturally"],
    image: "/images/dconditioner.jpg",
  },
];

function SectionCard({ section, index }: { section: typeof sections[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div style={{ background: section.color, padding: "5rem 0" }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 2.5rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
      }}>
        {isEven ? (
          <>
            <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "#e8e0d8" }}>
              <img src={section.image} alt={section.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: section.accent, marginBottom: "1rem" }}>
                {section.emoji} &nbsp; {section.category}
              </p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "3rem", fontWeight: 300, color: "#3d2b2b", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                {section.headline}
              </h2>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.9rem", color: "rgba(61,43,43,0.65)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1.25rem" }}>
                {section.teaser}
              </p>
              {expanded && section.full.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontFamily: "Jost, sans-serif", fontSize: "0.88rem", color: "rgba(61,43,43,0.6)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
              <button onClick={() => setExpanded(!expanded)} style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: section.accent, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "2rem", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                {expanded ? "Read Less ↑" : "Read More ↓"}
              </button>
              <div style={{ borderTop: "1px solid rgba(61,43,43,0.1)", paddingTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                {section.benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <span style={{ color: section.accent, fontSize: "0.7rem", marginTop: "1px" }}>✦</span>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "rgba(61,43,43,0.6)", fontWeight: 300, lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: section.accent, marginBottom: "1rem" }}>
                {section.emoji} &nbsp; {section.category}
              </p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "3rem", fontWeight: 300, color: "#3d2b2b", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                {section.headline}
              </h2>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.9rem", color: "rgba(61,43,43,0.65)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1.25rem" }}>
                {section.teaser}
              </p>
              {expanded && section.full.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontFamily: "Jost, sans-serif", fontSize: "0.88rem", color: "rgba(61,43,43,0.6)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
              <button onClick={() => setExpanded(!expanded)} style={{ fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: section.accent, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "2rem", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                {expanded ? "Read Less ↑" : "Read More ↓"}
              </button>
              <div style={{ borderTop: "1px solid rgba(61,43,43,0.1)", paddingTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                {section.benefits.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <span style={{ color: section.accent, fontSize: "0.7rem", marginTop: "1px" }}>✦</span>
                    <span style={{ fontFamily: "Jost, sans-serif", fontSize: "0.75rem", color: "rgba(61,43,43,0.6)", fontWeight: 300, lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ aspectRatio: "4/5", overflow: "hidden", background: "#e8e0d8" }}>
              <img src={section.image} alt={section.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "#fdf8f5", padding: "6rem 2rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(61,43,43,0.07)" }}>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c97b84", marginBottom: "1.25rem" }}>
          The Blossom Philosophy
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "#3d2b2b", lineHeight: 1.15, maxWidth: "700px", margin: "0 auto 1.5rem", fontStyle: "italic" }}>
          Why Organic Beauty Changes Everything
        </h1>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.92rem", color: "rgba(61,43,43,0.55)", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.9, fontWeight: 300 }}>
          We believe your skin and hair deserve ingredients you can pronounce — sourced from the earth, crafted with intention, and designed to work with your body rather than against it.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ width: "3rem", height: "1px", background: "rgba(61,43,43,0.15)" }} />
          <span style={{ color: "#c97b84", fontSize: "0.8rem" }}>✦</span>
          <div style={{ width: "3rem", height: "1px", background: "rgba(61,43,43,0.15)" }} />
        </div>
      </section>

      <section style={{ background: "#3d2b2b", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", textAlign: "center" }}>
          {[{ number: "100%", label: "Organic Ingredients" }, { number: "0", label: "Harmful Chemicals" }, { number: "♾️", label: "Love in Every Batch" }].map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300, color: "#f7e8e8", marginBottom: "0.4rem", fontStyle: "italic" }}>{s.number}</p>
              <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(247,232,232,0.5)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {sections.map((section, index) => (
        <SectionCard key={section.category} section={section} index={index} />
      ))}

      <section style={{ background: "#f7e8e8", padding: "5rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c97b84", marginBottom: "1.25rem" }}>
          Ready to Blossom?
        </p>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#3d2b2b", marginBottom: "1.5rem", fontStyle: "italic", maxWidth: "500px", margin: "0 auto 1.5rem", lineHeight: 1.2 }}>
          Your skin has been waiting for this
        </h2>
        <p style={{ fontFamily: "Jost, sans-serif", fontSize: "0.88rem", color: "rgba(61,43,43,0.5)", maxWidth: "380px", margin: "0 auto 2.5rem", lineHeight: 1.8, fontWeight: 300 }}>
          Explore the full Blossom with Lela collection and start your organic beauty journey today.
        </p>
        <Link href="/shop" style={{ display: "inline-block", border: "1px solid #3d2b2b", color: "#3d2b2b", fontFamily: "Jost, sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "1rem 3rem", textDecoration: "none" }}>
          Shop the Collection
        </Link>
      </section>
    </>
  );
}

