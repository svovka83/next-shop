import { Ingredient } from "@prisma/client";
import {
  PizzaSizes,
  PizzaTypes,
  mapPizzaType,
} from "../../constants/pizzaTypes";

/**
 * функція для отримання деталей піци
 *
 * @param size  // 10 / 20 / 30 / 40 - number
 * @param type // 1 / 2 / 3 - number
 * @param ingredients [] - масив вибраних інгредіїнтів
 *
 * @returns рядок
 */
export const getCartItemDetails = (
  size: PizzaSizes,
  type: PizzaTypes,
  ingredients: Ingredient[]
): string => {
  const details = [];

  if (size && type) {
    const typeName = mapPizzaType[type]; // повертає значення з об'єкту по ключу
    details.push(`${typeName} type, ${size} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
