import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
}

export default function ProductCard({
  name,
  slug,
  price,
  compareAtPrice,
  image,
}: ProductCardProps) {
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
        {name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold text-gray-900">${price.toFixed(2)}</span>
        {compareAtPrice && (
          <span className="text-sm text-gray-400 line-through">${compareAtPrice.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
}
