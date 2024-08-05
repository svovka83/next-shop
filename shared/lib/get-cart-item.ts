import { Ingredient } from "@prisma/client";
import {
  CocktailSizes,
  CocktailStrengths,
  mapCocktailStrength,
} from "../constants/cocktail";

/**
 * функція для перетворення значення з об'єкту та масиву у рядок
 *
 * @param size  // 25 / 50 / 75 / 100
 * @param strength // 2 / 4 / 8
 * @param ingredients [] - масив вибраних інгредіїнтів
 *
 * @returns рядок
 */
export const getCartItemDetails = (
  size: CocktailSizes,
  strength: CocktailStrengths,
  ingredients: Ingredient[]
): string => {
  const details = [];

  if (size && strength) {
    const strengthName = mapCocktailStrength[strength]; // повертає значення з об'єкту по ключу
    details.push(`${strengthName} ${size} ml`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
