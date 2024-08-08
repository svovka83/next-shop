import { ProductItem } from "@prisma/client";
import { PizzaTypes, pizzaSizes } from "../../constants/pizzaTypes";
import { Variant } from "../shared/pizza-utils/group-variants";

/**
 * функція отримання доступних розмірів піци за типом
 *
 * @param type - тип піци
 * @param variants - список варіантів піци
 *
 * @returns доступні варіанти розміру піци
 */

export const getAvailablePizzaSizes = (
  type: PizzaTypes,
  variants: ProductItem[]
): Variant[] => {
  const filteredPizzasByType = variants.filter(
    (variant) => variant.type === type
  ); // конкретний тип піци
  const availablePizzaSizes = pizzaSizes.map((variant) => ({
    // створюємо новий масив з доступними варіантами розмірів піц
    value: variant.value,
    name: variant.name,
    disabled: !filteredPizzasByType.some(
      // перевіряємо, чи є в доступних варіантах піци данний розмір
      (pizza) => Number(pizza.size) === Number(variant.value)
    ),
  }));

  return availablePizzaSizes;
};
