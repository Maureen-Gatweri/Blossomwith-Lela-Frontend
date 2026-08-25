const reviews = [
  {
    name: "Amina W.",
    verified: true,
    date: "5/28/2026",
    rating: 5,
    text: "I've been using the shea butter lotion for 2 weeks and my skin has never felt this soft! It absorbs so quickly and doesn't feel greasy at all. Will definitely repurchase.",
    product: "Shea Butter Lotion",
    image: "/images/sheabutter.jpg",
  },
  {
    name: "Grace N.",
    verified: true,
    date: "5/25/2026",
    rating: 5,
    text: "The rosehip oil is absolutely amazing. I apply it every night and my dark spots have visibly reduced. Love how it feels on the skin — lightweight and luxurious.",
    product: "Rosehip Face Oil",
    image: "/images/rosehip.jpg",
  },
  {
    name: "Stella M.",
    verified: true,
    date: "5/20/2026",
    rating: 4,
    text: "My hair feels so moisturised after using the coconut mask. I leave it on for 30 mins and my curls come out defined and shiny. Genuinely obsessed.",
    product: "Coconut Hair Mask",
    image: "/images/conditioners.jpg",
  },
  {
    name: "Fatuma A.",
    verified: true,
    date: "5/15/2026",
    rating: 5,
    text: "The body scrub left my skin glowing! I use it twice a week and my skin tone has evened out so much. Smells incredible too — highly recommend.",
    product: "LelaBody Scrub",
    image: "/images/scrub.jpg",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-base ${s <= rating ? "text-rose" : "text-bark/15"}`}>★</span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-[#fdf8f5]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className="text-rose text-xl">★</span>
            ))}
          </div>
          <span className="font-display text-2xl text-bark font-light">247 Reviews</span>
        </div>

        <div className="flex gap-4 mb-10 border-b border-bark/10 pb-4">
          <button className="text-xs tracking-widest uppercase font-body text-bark border-b-2 border-bark pb-1">
            Product reviews &nbsp;<span className="text-bark/40">247</span>
          </button>
          <button className="text-xs tracking-widest uppercase font-body text-bark/40 pb-1">
            Store reviews &nbsp;<span>89</span>
          </button>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 flex gap-5">

              {/* Text side */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body font-medium text-sm text-bark">{r.name}</span>
                  <span className="flex items-center gap-1 text-xs text-green-600 font-body">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="6" fill="#16a34a"/>
                      <path d="M3.5 6l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Verified
                  </span>
                </div>
                <p className="text-xs text-bark/30 font-body mb-3">{r.date}</p>
                <StarRating rating={r.rating} />
                <p className="text-sm text-bark/70 font-body font-light leading-relaxed mb-4">
                  {r.text}
                </p>
                <p className="text-xs tracking-widest uppercase text-bark/40 font-body">{r.product}</p>
              </div>

              {/* Product image */}
              <div className="w-24 h-24 shrink-0 bg-sand overflow-hidden">
                <img
                  src={r.image}
                  alt={r.product}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}