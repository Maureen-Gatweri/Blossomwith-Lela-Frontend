const values = [
  { icon: "🌿", title: "Organic Ingredients", desc: "Every ingredient sourced from nature — nothing synthetic, ever." },
  { icon: "🤲", title: "Small Batch Crafted", desc: "Made with care in small batches to ensure maximum quality." },
  { icon: "🌍", title: "Made in Kenya", desc: "Proudly Kenyan, celebrating African beauty rituals." },
];

export default function AboutStrip() {
  return (
    <section className="border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {values.map((v) => (
          <div key={v.title} className="flex items-start gap-4 px-0 md:px-10 py-6 md:py-0 first:pl-0 last:pr-0">
            <span className="text-2xl mt-1">{v.icon}</span>
            <div>
              <h3 className="font-display text-lg text-bark mb-1">{v.title}</h3>
              <p className="text-bark/50 text-sm leading-relaxed font-body font-light">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}