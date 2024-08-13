import React from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "../functions/formation-cart-details";

interface ReturnProps {
  cartItems: CartStateItem[];
  totalAmount: number;
  fetchCartItems: () => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
}

export const useCart = (): ReturnProps => {
  const [
    cartItems,
    totalAmount,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    loading,
  ] = useCartStore((state) => [
    state.cartItems,
    state.totalAmount,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeItem,
    state.loading,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    totalAmount,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    loading,
  };
};
