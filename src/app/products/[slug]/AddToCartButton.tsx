"use client";

import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  productId: number;
  inStock: boolean;
}

export default function AddToCartButton({ productId, inStock }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full sm:w-auto px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(productId, 1)}
      className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
    >
      Add to Cart — ${/* This will show on hover in the cart drawer */}
    </button>
  );
}
