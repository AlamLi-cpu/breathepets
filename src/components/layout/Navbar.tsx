"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/#features", label: "Why Choose Us" },
  { href: "/#faq", label: "Learn & Support" },
  { href: "/#", label: "About Us" },
];

const learnLinks = [
  { href: "/#", label: "Quick Setup Guide" },
  { href: "/#", label: "Cat Adaptation Guide" },
  { href: "/#", label: "Cleaning & Maintenance" },
  { href: "/#", label: "Cat Care Blogs" },
];

const helpLinks = [
  { href: "/#", label: "FAQs" },
  { href: "/#", label: "Returns & Warranty" },
  { href: "/#", label: "Contact Us" },
  { href: "/#", label: "Shipping Policy" },
];

export default function Navbar() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { toggleSearch, toggleMobileMenu, isMobileMenuOpen } = useUI();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const cartCount = cartState.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gray-50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {["Facebook", "X", "Instagram", "YouTube", "TikTok"].map((s) => (
              <span key={s} className="hover:text-gray-700 cursor-pointer">
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span>🇺🇸 United States | USD $</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-teal-600">
            YourBrand
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.label === "Learn & Support" ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <span className="text-sm font-medium text-gray-700 hover:text-teal-600 cursor-pointer py-5">
                    {link.label}
                  </span>
                  {showMegaMenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl border rounded-lg p-6 min-w-[480px] z-50">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 mb-3">Guides</h4>
                          <ul className="space-y-2">
                            {learnLinks.map((l) => (
                              <li key={l.label}>
                                <Link href={l.href} className="text-sm text-gray-500 hover:text-teal-600">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 mb-3">Help</h4>
                          <ul className="space-y-2">
                            {helpLinks.map((l) => (
                              <li key={l.label}>
                                <Link href={l.href} className="text-sm text-gray-500 hover:text-teal-600">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link href="/cart" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>

            <button
              onClick={() => cartDispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-sm font-medium text-gray-700 hover:text-teal-600 py-2"
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
