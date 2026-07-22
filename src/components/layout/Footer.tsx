"use client";

import { useState } from "react";

const footerSections = {
  support: {
    title: "SUPPORT",
    links: [
      { label: "Contact", href: "/#" },
      { label: "FAQ", href: "/#faq" },
      { label: "Shop The Guide", href: "/#" },
      { label: "Track Your Order", href: "/#" },
    ],
  },
  contact: {
    title: "CONTACT",
    links: [
      { label: "About Us", href: "/#" },
      { label: "Blog", href: "/#" },
      { label: "Join Affiliate", href: "/#" },
      { label: "Wholesale", href: "/#" },
    ],
  },
  info: {
    title: "INFO",
    links: [
      { label: "Shipping Policy", href: "/#" },
      { label: "Return Policy", href: "/#" },
      { label: "Warranty", href: "/#" },
      { label: "Privacy Policy", href: "/#" },
      { label: "Terms of Service", href: "/#" },
      { label: "Patent Notice", href: "/#" },
    ],
  },
};

const socialIcons = ["Facebook", "X", "Instagram", "YouTube", "TikTok", "Pinterest"];
const paymentIcons = ["Amex", "Apple Pay", "Google Pay", "Mastercard", "PayPal", "Shop Pay", "Visa"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribeStatus("success");
        setEmail("");
      } else {
        setSubscribeStatus("error");
      }
    } catch {
      setSubscribeStatus("error");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: Logo + Tagline */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white">YourBrand</h3>
          <p className="text-gray-400 mt-2 text-sm">Your Product — Your First Smart Solution</p>
        </div>

        {/* Middle: Link columns + Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">NEWSLETTER</h4>
            <p className="text-sm text-gray-400 mb-3">Sign up and get 10% off your first order</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors whitespace-nowrap"
              >
                Sign Up
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="text-green-400 text-xs mt-2">Thanks for subscribing!</p>
            )}
            {subscribeStatus === "error" && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-8">
          {socialIcons.map((icon) => (
            <span key={icon} className="text-gray-400 hover:text-white cursor-pointer text-sm">
              {icon}
            </span>
          ))}
        </div>

        {/* Contact email */}
        <div className="mb-8">
          <a href="mailto:support@yourbrand.com" className="text-sm text-gray-400 hover:text-white">
            support@yourbrand.com
          </a>
        </div>

        {/* Payment icons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {paymentIcons.map((icon) => (
            <span key={icon} className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
              {icon}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 YourBrand. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🇺🇸 United States / USD $</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
