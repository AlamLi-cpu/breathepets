"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const reviewers = [
  {
    name: "James Lovett",
    avatar: "https://placehold.co/150x150/0d9488/ffffff?text=JL",
    stars: 5,
    text: "This litter box has completely changed my life. I have three cats and the AutoScooper handles all of them without any issues. The odor control is incredible — I can't smell a thing.",
  },
  {
    name: "Nick",
    avatar: "https://placehold.co/150x150/115e59/ffffff?text=N",
    stars: 5,
    text: "I was skeptical at first but this thing is QUIET. Like, surprisingly quiet. My cat adapted in just 2 days and now she won't use anything else.",
  },
  {
    name: "Kendra",
    avatar: "https://placehold.co/150x150/0f766e/ffffff?text=K",
    stars: 5,
    text: "My 18-pound Maine Coon fits comfortably in this. I tried other automatic boxes but they were all too small. The open-top design is perfect for big cats.",
  },
  {
    name: "Jennifer",
    avatar: "https://placehold.co/150x150/134e4a/ffffff?text=J",
    stars: 5,
    text: "I compared this to the Litter Robot and honestly, for the price difference, this is a no-brainer. Same functionality, better design, and no app required.",
  },
  {
    name: "Andrea",
    avatar: "https://placehold.co/150x150/0d9488/ffffff?text=A",
    stars: 5,
    text: "Setup took 5 minutes. Literally took it out of the box, plugged it in, added litter, and it just worked. The simplicity is what sold me.",
  },
  {
    name: "Buckraider",
    avatar: "https://placehold.co/150x150/115e59/ffffff?text=BR",
    stars: 4,
    text: "Great product for multi-cat homes. I have four cats and this handles the load. Only giving 4 stars because I wish the waste drawer was slightly larger.",
  },
];

export default function ReviewsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviewers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const reviewer = reviewers[active];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Approved by the Toughest Critics
          </h2>
          <p className="text-gray-500">Real reviews from real cat parents.</p>
        </div>

        {/* Avatar nav */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {reviewers.map((r, i) => (
            <button
              key={r.name}
              onClick={() => setActive(i)}
              className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${
                i === active
                  ? "border-teal-600 scale-110 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Active review */}
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: reviewer.stars }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
            &ldquo;{reviewer.text}&rdquo;
          </blockquote>
          <p className="text-sm font-semibold text-gray-900">{reviewer.name}</p>
        </div>

        <div className="text-center mt-10">
          <Button href="/products" variant="primary">
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
