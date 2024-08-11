"use client";

import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

/**
 * хук для зберігання значень фільтрів
 *
 * @returns selectedIngredients, types, sizes, prices
 * @returns setPrices, setTypes, setSizes, setSelectedIngredients
 */
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
  // хук для отримання query params, в даному випадку для зберігання значень url в useSet-тах при перезавантаженні сторінки !!!
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  ); // хук для управління множиной вибраних інгредієнтів, toggle вміє додавати і видаляти елементи з множини

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [types, { toggle: toggleTypes }] = useSet(
    new Set<string>(
      searchParams.has("types") ? searchParams.get("types")?.split(",") : []
    )
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return React.useMemo(
    () => ({
      selectedIngredients,
      types,
      sizes,
      prices,
      setPrices: updatePrice,
      setTypes: toggleTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [selectedIngredients, types, sizes, prices]
  );
};
