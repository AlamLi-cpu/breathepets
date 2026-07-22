"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { state, dispatch, removeFromCart, updateQuantity } = useCart();
  const { items, isOpen } = state;

  const subtotal = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => dispatch({ type: "TOGGLE_CART", isOpen: false })}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Cart ({items.length})
          </h2>
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART", isOpen: false })}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
              <p className="text-sm text-gray-400">Not sure where to start? Try these:</p>
              <Link
                href="/products"
                className="inline-block mt-3 text-teal-600 hover:text-teal-700 text-sm font-medium"
                onClick={() => dispatch({ type: "TOGGLE_CART", isOpen: false })}
              >
                Browse Products →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            {/* Discount code */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code"
                className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:border-teal-500"
              />
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                Apply
              </button>
            </div>

            {/* Order note */}
            <div>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                + Add order note
              </button>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-medium text-gray-700">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-400">Shipping & taxes calculated at checkout</p>

            <Link
              href="/cart"
              className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              onClick={() => dispatch({ type: "TOGGLE_CART", isOpen: false })}
            >
              Check out
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
