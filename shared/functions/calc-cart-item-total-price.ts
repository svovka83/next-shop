import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  const totalPrice =
    (item.productItem.price + ingredientsPrice) * item.quantity;

  return totalPrice;
};
