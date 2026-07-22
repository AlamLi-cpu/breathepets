"use client";

import { useUI } from "@/context/UIContext";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export default function SearchOverlay() {
  const { isSearchOpen, toggleSearch } = useUI();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (isSearchOpen && products.length === 0) {
      fetch("/api/products")
        .then((res) => res.json())
        .then(setProducts)
        .catch(console.error);
    }
  }, [isSearchOpen, products.length]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      setResults(products.filter((p) => p.name.toLowerCase().includes(q)));
    } else {
      setResults([]);
    }
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={toggleSearch}
      />
      <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-2xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-lg outline-none"
              autoFocus
            />
            <button onClick={toggleSearch} className="text-sm text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4 pb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {results.length} result{results.length > 1 ? "s" : ""}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={toggleSearch}
                  className="flex items-center gap-4 py-2 hover:bg-gray-50 rounded-lg -mx-2 px-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <p className="text-sm text-gray-400 pb-6">No products found for &quot;{query}&quot;</p>
          )}
        </div>
      </div>
    </>
  );
}
