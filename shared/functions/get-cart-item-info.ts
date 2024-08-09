import { Ingredient } from "@prisma/client";
import {
  PizzaSizes,
  PizzaTypes,
  mapPizzaType,
} from "../constants/pizzaTypes";
import { CartIngredient } from "../components/shared/cart-item-details/cart-item.types";

/**
 * Функція для формування інформації про піцу у вигляді рядка
 *
 * @param size  // 10 / 20 / 30 / 40 - number
 * @param type // 1 / 2 / 3 - number
 * @param ingredients [] - масив об'єктів вибраних інгредіїнтів
 *
 * @returns рядок
 */
export const getCartItemInfo = (
  size: PizzaSizes,
  type: PizzaTypes,
  ingredients: CartIngredient[]
): string => {
  const detailsArray = [];

  if (size && type) {
    const typeName = mapPizzaType[type]; // повертає значення з об'єкту по ключу
    detailsArray.push(`${typeName} type, size ${size} sm`);
  }

  if (ingredients) {
    detailsArray.push(...ingredients.map((ingredient) => ingredient.name));
  }

  const details = detailsArray.join(", ");

  return details;
};
