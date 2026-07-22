"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";

interface CartItem {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string;
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
}

type CartAction =
  | { type: "SET_ITEMS"; items: CartItem[] }
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "UPDATE_QUANTITY"; id: number; quantity: number }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "TOGGLE_CART"; isOpen?: boolean }
  | { type: "SET_LOADING"; isLoading: boolean };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.items, isLoading: false };
    case "ADD_ITEM":
      const existingIndex = state.items.findIndex(
        (i) => i.productId === action.item.productId
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = action.item;
        return { ...state, items: newItems };
      }
      return { ...state, items: [action.item, ...state.items] };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "TOGGLE_CART":
      return { ...state, isOpen: action.isOpen ?? !state.isOpen };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    isLoading: false,
  });

  const fetchCart = useCallback(async () => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    try {
      const res = await fetch("/api/cart");
      const items = await res.json();
      if (Array.isArray(items)) {
        dispatch({ type: "SET_ITEMS", items });
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  }, []);

  const addToCart = useCallback(
    async (productId: number, quantity = 1) => {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        const item = await res.json();
        if (item.id) {
          dispatch({ type: "ADD_ITEM", item });
          dispatch({ type: "TOGGLE_CART", isOpen: true });
        }
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    },
    []
  );

  const removeFromCart = useCallback(async (id: number) => {
    try {
      await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
      dispatch({ type: "REMOVE_ITEM", id });
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  }, []);

  const updateQuantity = useCallback(
    async (id: number, quantity: number) => {
      if (quantity < 1) {
        await removeFromCart(id);
        return;
      }
      dispatch({ type: "UPDATE_QUANTITY", id, quantity });
      // Note: In a more complete app, we'd persist this to the server
    },
    [removeFromCart]
  );

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
