import { calcCartItemTotalPrice } from ".";
import { CartDTO } from "../services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  size: number | null;
  type: number | null;
  ingredients: Array<{ name: string; price: number }>;
  disabled?: boolean;
};

interface ReturnProps {
  cartItems: CartStateItem[];
  totalAmount: number;
}

export const formationCartDetails = (data: CartDTO): ReturnProps => {
  const cartItems = data.cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    size: item.productItem.size,
    type: item.productItem.type,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
    disabled: false,
  }));

  return {
    totalAmount: data.totalAmount,
    cartItems,
  };
};
