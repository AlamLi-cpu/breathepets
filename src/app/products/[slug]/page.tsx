import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const images: string[] = JSON.parse(product.images);
  const features: string[] = JSON.parse(product.features);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <a href="/" className="hover:text-gray-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-gray-600">Products</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={images[0] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="text-sm text-teal-600 font-medium">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            {product.compareAtPrice && (
              <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded">
                Save ${(product.compareAtPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                Features
              </h3>
              <ul className="space-y-2">
                {features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to cart */}
          <div className="flex items-center gap-4">
            <AddToCartButton productId={product.id} inStock={product.inStock} />
          </div>

          {/* Stock status */}
          <p className={`text-sm mt-4 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
            {product.inStock ? "✓ In Stock" : "✕ Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
}
