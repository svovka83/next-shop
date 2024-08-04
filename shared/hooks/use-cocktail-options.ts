import React from "react";
import { useSet } from "react-use";
import { CocktailSizes, CocktailStrengths } from "../constants/cocktail";
import { getAvailableCocktailStrength } from "../lib";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

/**
 *  хук для вибору розміру, міцності коктеюля та вибору інгредіїнтів
 *
 * @param size - розмір коктеюля
 * @param strength - міцність коктеюля
 * @param setSize - функція для зміни розміру коктеюля
 * @param setStrength - функція для зміни міцності коктеюля
 * @param selectedIngredients - масив вибраних інгредіїнтів
 * @param addIngredient - функція для зміни масиву вибраних інгредіїнтів
 */

interface ReturnProps {
  size: CocktailSizes;
  strength: CocktailStrengths;
  selectedIngredients: Set<number>;
  availableStrength: Variant[];
  setSize: (size: CocktailSizes) => void;
  setStrength: (strength: CocktailStrengths) => void;
  addIngredient: (id: number) => void;
}

export const useCocktailOptions = (
  items: ProductItem[],
): ReturnProps => {
  const [size, setSize] = React.useState<CocktailSizes>(25);
  const [strength, setStrength] = React.useState<CocktailStrengths>(2);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableStrength = getAvailableCocktailStrength(size, items);

  React.useEffect(() => {
    const isAvailableStrength = availableStrength?.find(
      (item) => Number(item.value) === strength && !item.disabled
    ); // шукаємо current strength в доступних списках варіантів і перевіряємо, чи він незадізейблений
    const firstAvailableStrength = availableStrength?.find(
      (item) => !item.disabled
    ); // шукаємо перший незадізейблений strength

    if (!isAvailableStrength && firstAvailableStrength) {
      setStrength(Number(firstAvailableStrength.value) as CocktailStrengths);
    }
  }, [size]);

  return {
    size,
    strength,
    selectedIngredients,
    availableStrength,
    setSize,
    setStrength,
    addIngredient,
  };
};
