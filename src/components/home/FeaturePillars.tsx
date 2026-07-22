import Link from "next/link";

const features = [
  {
    icon: "🛡️",
    title: "Engineered Safety",
    description:
      "Multi-layer sensing system with anti-rotation safety. The cycle pauses instantly if your cat is detected.",
    link: "/#",
    linkLabel: "Safety System™ →",
  },
  {
    icon: "🔒",
    title: "Sealed Freshness",
    description:
      "Waste containment without daily intervention. Carbon-infused bags lock in odors for days.",
  },
  {
    icon: "🐱",
    title: "Multi-Cat Ready",
    description:
      "Consistent performance whether you have one cat or five. Built tough for heavy use.",
  },
  {
    icon: "🔌",
    title: "No App. No Wi-Fi",
    description:
      "Just plug it in and it works. No confusing apps, no connectivity issues — simple and reliable.",
  },
  {
    icon: "🏠",
    title: "Designed for Every Cat",
    description:
      "Open-top design is spacious and inviting. No cramped enclosures that cats dislike.",
    link: "/#",
    linkLabel: "Why Open-Top Matters →",
  },
  {
    icon: "📅",
    title: "Up to 10 Days Clean",
    description:
      "Large-capacity waste drawer means less frequent emptying. Spend more time with your cat.",
  },
];

export default function FeaturePillars() {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Better cat care starts with smarter technology
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Every detail engineered for you and your cat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {feature.description}
              </p>
              {feature.link && (
                <Link
                  href={feature.link}
                  className="text-teal-600 text-sm font-medium hover:text-teal-700"
                >
                  {feature.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
