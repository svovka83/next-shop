import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSizes, PizzaTypes } from "../constants/pizzaTypes";

/**
 * Функція загальної вартості піци
 *
 * @param size - розмір вибраної піци
 * @param type - тип вибраної піци
 * @param variants - список варіантів піц
 * @param ingredients - список всіх інгредіїнтів
 * @param selectedIngredients - вибрані інгредіїнти
 *
 * @returns number totalPrice загальна вартість піци
 */

export const calcTotalPizzaPrice = (
  size: PizzaSizes,
  type: PizzaTypes,
  variants: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = variants.find(
    (variant) => variant.size === size && variant.type === type
  )?.price;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice ? pizzaPrice + totalIngredientsPrice : 0;

  return totalPrice;
};
