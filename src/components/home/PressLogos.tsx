const logos = [
  "Yahoo News",
  "Business Insider",
  "MSN",
  "The Verge",
  "TechCrunch",
  "Wired",
  "Forbes",
  "CNN",
];

export default function PressLogos() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">In the News</h2>
          <p className="text-sm text-gray-500">Featured in trusted news and business media networks</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-gray-400 font-bold text-lg md:text-xl tracking-tight hover:text-gray-600 transition-colors cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
