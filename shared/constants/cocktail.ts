export const mapCocktailSize = {
  25: "Small",
  50: "Medium",
  75: "Large",
  100: "Extra large",
} as const;

export const mapCocktailStrength = {
  1: "Light",
  2: "Medium",
  3: "Strong",
} as const;

export const cocktailSizes = Object.entries(mapCocktailSize).map(
  ([value, name]) => ({
    value,
    name,
  })
); // перетворюємо об'єкт в масив

export const cocktailStrengths = Object.entries(mapCocktailStrength).map(
  ([value, name]) => ({
    value,
    name,
  })
);

export type CocktailSizes = keyof typeof mapCocktailSize;
export type CocktailStrengths = keyof typeof mapCocktailStrength;
