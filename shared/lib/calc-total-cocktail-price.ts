import { Ingredient, ProductItem } from "@prisma/client";
import { CocktailSizes, CocktailStrengths } from "../constants/cocktail";

/* 
* функція визначення загальної вартості коктеюля
*
* @param size - розмір коктеюля
* @param strength - міцність коктеюля
* @param items - список варіантів коктеюля
* @param ingredients - список всіх інгредіїнтів
* @param selectedIngredients - список вибраних інгредіїнтів
*/
export const CalcTotalCocktailPrice = (
  size: CocktailSizes,
  strength: CocktailStrengths,
  items: ProductItem[],
  ingredients:  Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const cocktailPrice = items.find(
    (item) => item.size === size && item.strength === strength
  )?.price as number;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return cocktailPrice + totalIngredientsPrice;
};
