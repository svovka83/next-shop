import { PizzaSizes, PizzaTypes, mapPizzaType } from "@/shared/constants/pizzaTypes";
import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from ".";

export const getPizzaDetails = (
  size: PizzaSizes,
  type: PizzaTypes,
  variants: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    size,
    type,
    variants,
    ingredients,
    selectedIngredients
  );
  const textDetails = `size: ${size} ml, type: ${mapPizzaType[type]} ( ${type} % )`;

  return { totalPrice, textDetails };
};
