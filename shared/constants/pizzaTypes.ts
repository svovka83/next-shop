export const mapCocktailSize = {
  10: "Small",
  20: "Medium",
  30: "Big",
  40: "Extra big",
} as const;

export const mapCocktailStrength = {
  1: "Thin",
  2: "Normal",
  3: "Massive",
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
