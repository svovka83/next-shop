export const mapPizzaSize = {
  10: "Small",
  20: "Medium",
  30: "Big",
  40: "Extra big",
} as const;

export const mapPizzaType = {
  1: "Thin",
  2: "Normal",
  3: "Massive",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  value,
  name,
})); // перетворюємо об'єкт в масив

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  value,
  name,
}));

export type PizzaSizes = keyof typeof mapPizzaSize;
export type PizzaTypes = keyof typeof mapPizzaType;
