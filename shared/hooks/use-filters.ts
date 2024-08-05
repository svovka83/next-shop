import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  // extends включає всі властивості PriceProps
  types: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  selectedIngredients: Set<string>;
  types: Set<string>;
  sizes: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters, // ключі властивостей QueryFilters
    string
  >; // хук для отримання query params, в даному випадку для зберігання значень url в useSet-тах при перезавантаженні сторінки !!!

  {
    /* filters for ingredients */
  }
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  ); // хук для управління множиной вибраних інгредієнтів, toggle вміє додавати і видаляти елементи з множини
  // values - масив інгредієнтів, які вибрані користувачем

  {
    /* filters for strength and size */
  }
  const [types, { toggle: toggleTypes }] = useSet(
    new Set<string>(
      searchParams.has("types") // перевіряємо наявність query params "types"
        ? searchParams.get("types")?.split(",") // якщо є, то отримуємо значення через кому
        : []
    )
  );
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  {
    /* filters for price */
  }
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return {
    selectedIngredients,
    types,
    sizes,
    prices,
    setSelectedIngredients: toggleIngredients,
    setTypes: toggleTypes,
    setSizes: toggleSizes,
    setPrices: updatePrice,
  };
};
