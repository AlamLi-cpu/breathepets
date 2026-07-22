import { prisma } from "@/lib/db";
import ProductCard from "@/components/ui/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Shop All Products
        </h1>
        <p className="text-gray-500">Everything your cat needs for a cleaner home.</p>
      </div>

      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        return (
          <section key={category} className="mb-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.image}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
