import { CalcTotalCocktailPrice } from "./calc-total-cocktail-price";
import { Ingredient, ProductItem } from "@prisma/client";
import { CocktailSizes, CocktailStrengths } from "../constants/pizzaTypes";
import { mapCocktailStrength } from "../constants/pizzaTypes";

export const getCocktailDetails = (
  size: CocktailSizes,
  strength: CocktailStrengths,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = CalcTotalCocktailPrice(
    size,
    strength,
    items,
    ingredients,
    selectedIngredients
  );
  const textDetails = `size: ${size} ml, strength: ${mapCocktailStrength[strength]} ( ${strength} % )`;

  return { totalPrice, textDetails };
};
