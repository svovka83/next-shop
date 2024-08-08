import React from "react";
import { useSet } from "react-use";
import { PizzaSizes, PizzaTypes } from "../constants/pizzaTypes";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/pizza-utils/group-variants";
import { getAvailablePizzaSizes } from "../components/functions";

/**
 *  хук для вибору розміру, типу піци та вибору інгредіїнтів
 *
 * @param size - розмір піци
 * @param type - тип піци
 * @param setSize - функція для зміни розміру піци
 * @param setType - функція для зміни типу піци
 * @param selectedIngredients - масив вибраних інгредіїнтів
 * @param addIngredient - функція для зміни масиву вибраних інгредіїнтів
 */

interface ReturnProps {
  size: PizzaSizes;
  type: PizzaTypes;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  setSize: (size: PizzaSizes) => void;
  setType: (type: PizzaTypes) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSizes>(30);
  const [type, setType] = React.useState<PizzaTypes>(2);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availablePizzaSizes = getAvailablePizzaSizes(type, variants);

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (variant) => Number(variant.value) === size && !variant.disabled
    ); // чи активний size незадізейблений
    const firstAvailableSize = availablePizzaSizes?.find(
      (variant) => !variant.disabled
    ); // шукаємо перший незадізейблений size

    if (!isAvailableSize && firstAvailableSize) {
      // якщо активний size задізейблений то сетаєм перший незадізейблений
      setSize(Number(firstAvailableSize.value) as PizzaSizes);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    setSize,
    setType,
    addIngredient,
  };
};
