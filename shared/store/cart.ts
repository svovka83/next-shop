import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem } from "../functions/formation-cart-details";
import { formationCartDetails } from "../functions";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
  cartItems: CartStateItem[];
  totalAmount: number;
  loading: boolean;
  error: boolean;

  /* Отримання товарів з корзини */
  fetchCartItems: () => Promise<void>;

  /* Запит на оновлення кількості товарів */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запит на додавання товару до корзини */
  addCartItem: (values: CreateCartItemValues) => Promise<void>;

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
      const data = await Api.cart.getCart();
      set(formationCartDetails(data)); // формуємо плоский об'єкт з деталями корзини з отриманого об'єкту
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(formationCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(formationCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));
      const data = await Api.cart.deleteCartItem(id);
      set(formationCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        cartItems: state.cartItems.map((item) => ({
          ...item,
          disabled: false,
        })),
      }));
    }
  },
}));
