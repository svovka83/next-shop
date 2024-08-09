import { create } from "zustand";
import { Api } from "../services/api-client";
import { formationCartDetails } from "../functions";

export type ICartItem = {
  id: number;
  quantity: number;
  name: string;
  image: string;
  price: number;
  size: number;
  type: number;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  cartItems: ICartItem[];
  totalAmount: number;
  loading: boolean;
  error: boolean;

  /* Отримання товарів з корзини */
  fetchCartItems: () => Promise<void>;

  /* Запит на оновлення кількості товарів */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запит на додавання товару до корзини */
  addCartItem: (values: any) => Promise<void>;

  /* Запит на видалення товару з корзини */
  removeItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  totalAmount: 0,
  loading: true,
  error: false,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(formationCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {},

  addCartItem: async (values: any) => {},

  removeItem: async (id: number) => {},
}));
