const galleryImages = [
  { src: "/images/sheabutter.jpg", alt: "Shea Butter Lotion" },
  { src: "/images/rosehip.jpg", alt: "Rosehip Face Oil" },
  { src: "/images/conditioners.jpg", alt: "Hair Conditioner" },
  { src: "/images/scrub.jpg", alt: "Body Scrub" },
  { src: "/images/soap.jpg", alt: "Soap Bar" },
  { src: "/images/almond.jpg", alt: "Almond Oil" },
  { src: "/images/spritz.jpg", alt: "Hair Spritz" },
  { src: "/images/raaw-shea-butter.jpg", alt: "Raw Shea Butter" },
];

export default function GalleryGrid() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.25em] uppercase text-bark/40 font-body mb-2">
          The Blossom Life
        </p>
        <h2 className="font-display text-4xl font-light text-bark">
          Our Looks
        </h2>
      </div>

      {/* 4-column mosaic grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden bg-sand group cursor-pointer ${
              i === 0 || i === 5 ? "row-span-2" : ""
            }`}
            style={{ aspectRatio: i === 0 || i === 5 ? "auto" : "1/1" }}>
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ minHeight: i === 0 || i === 5 ? "100%" : "auto" }}
            />
          </div>
        ))}
      </div>

    </section>
  );
}