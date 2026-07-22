"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const slides = [
  {
    headline: "The cleanest way to live with cats",
    subtext: "Experience the future of litter box technology",
    cta: "Shop Now →",
    ctaHref: "/products",
    bgColor: "from-teal-900/70 to-gray-900/70",
    bgImage: "https://placehold.co/1400x700/134e4a/ffffff?text=Hero+1",
  },
  {
    headline: "Over 1 million sold",
    subtext: "Say hello to the smartest litter box on the market",
    cta: "Learn More →",
    ctaHref: "/#features",
    bgColor: "from-gray-900/70 to-teal-900/70",
    bgImage: "https://placehold.co/1400x700/0f766e/ffffff?text=Hero+2",
  },
  {
    headline: "Simple, brilliant upgrade",
    subtext: "Loved by pet owners everywhere",
    cta: "Read Reviews →",
    ctaHref: "/#reviews",
    bgColor: "from-teal-800/70 to-gray-800/70",
    bgImage: "https://placehold.co/1400x700/115e59/ffffff?text=Hero+3",
  },
  {
    headline: "Designed for cats. Made for everyday life.",
    subtext: "No app. No Wi-Fi. Just plug it in and it works.",
    cta: "Shop Now →",
    ctaHref: "/products",
    bgColor: "from-gray-800/70 to-teal-800/70",
    bgImage: "https://placehold.co/1400x700/0d9488/ffffff?text=Hero+4",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Background image */}
      <img
        src={slide.bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {slide.headline}
          </h1>
          <p className="text-lg text-gray-200 mb-8">{slide.subtext}</p>
          <Button href={slide.ctaHref} variant="outline" size="lg">
            {slide.cta}
          </Button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
