import React from "react";
import { useSet } from "react-use";
import { PizzaSizes, PizzaTypes } from "../constants/pizzaTypes";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/pizza-utils/group-variants";
import { getAvailablePizzaSizes } from "../functions";

/**
 * Хук для вибору розміру і типу піци, вибору інгредіїнтів та переключення розміру піци при вибраному типі на наступний, якщо він є неактивним
 *
 * @param variants - список варіантів піц
 *
 * @returns size - розмір піци
 * @returns type - тип піци
 * @returns setSize - функція для зміни розміру піци
 * @returns setType - функція для зміни типу піци
 * @returns availablePizzaSizes - доступні варіанти розміру піци
 * @returns selectedIngredients - масив вибраних інгредіїнтів
 * @returns addIngredient - функція для зміни масиву вибраних інгредіїнтів
 */

interface ReturnProps {
  size: PizzaSizes;
  type: PizzaTypes;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  currentVariantId?: number;
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

  const currentVariantId = variants.find(
    (variant) => variant.size === size && variant.type === type
  )?.id;

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (variant) => Number(variant.value) === size && !variant.disabled
    ); // чи є активний size незадізейблений
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
    currentVariantId,
    setSize,
    setType,
    addIngredient,
  };
};
