export const mapCocktailSize = {
  25: "Small",
  50: "Medium",
  75: "Large",
  100: "Extra large",
} as const;

export const mapCocktailStrength = {
  1: "light",
  2: "medium",
  3: "strong",
} as const;

export const cocktailSizes = Object.entries(mapCocktailSize).map(
  ([name, value]) => ({
    // перетворюємо об'єкт в масив
    name,
    value,
  })
);
