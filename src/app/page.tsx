import HeroSlider from "@/components/home/HeroSlider";
import AboutStrip from "@/components/home/AboutStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";

import { Toaster } from "react-hot-toast";

export default function HomePage() {
  return (
    <>
      <Toaster position="top-right" />
      <HeroSlider />
      <AboutStrip />
      <FeaturedProducts />

      {/* Editorial banner */}
      <section className="bg-blush py-20 text-center px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-rose mb-4 font-body">Our Philosophy</p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-bark max-w-3xl mx-auto leading-tight">
          "Beauty is being the best version of yourself — inside and out."
        </h2>
        <p className="text-bark/50 mt-6 text-sm font-body font-light max-w-md mx-auto leading-relaxed">
          Every product in the Blossom collection is made with organic, locally sourced ingredients to celebrate your natural beauty.
        </p>
      </section>

      <CategorySection />
    </>
  );
}