"use client";

import React, { createContext, useContext, useState } from "react";

interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  closeAll: () => void;
}

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const closeAll = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <UIContext.Provider
      value={{ isSearchOpen, isMobileMenuOpen, toggleSearch, toggleMobileMenu, closeAll }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
