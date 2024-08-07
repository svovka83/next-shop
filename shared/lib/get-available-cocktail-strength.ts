import { ProductItem } from "@prisma/client";
import { CocktailSizes, cocktailStrengths } from "../constants/pizzaTypes";
import { Variant } from "../components/shared/utils-product/group-variants";

/**
 * функція отримання доступних варіантів міцності коктеюля за розміром
 *
 * @param size - розмір коктеюля
 * @param items - список варіантів коктеюля
 *
 * @returns доступні варіанти міцності коктеюля
 */

export const getAvailableCocktailStrength = (
  size: CocktailSizes,
  items: ProductItem[]
): Variant[] => {
  const filteredCocktailsBySize = items.filter((item) => item.size === size); // отримуємо список доступних коктеєлів за розміром
  const availableCocktailStrength = cocktailStrengths.map((item) => ({
    // створюємо новий масив з доступними варіантами strength
    value: item.value,
    name: item.name,
    disabled: !filteredCocktailsBySize.some(
      // перевіряємо, чи є доступний варіант strength у доступних коктеєлях за наявним розміром
      (cocktail) => Number(cocktail.strength) === Number(item.value)
    ),
  }));

  return availableCocktailStrength;
};
