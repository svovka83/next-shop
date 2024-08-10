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
  const typeName = mapPizzaType[type]
  const textDetails = `${typeName} type, size ${size} sm`;

  return { totalPrice, textDetails };
};
