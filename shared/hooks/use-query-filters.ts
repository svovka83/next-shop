"use client";

import React from "react";
import qs from "qs"; // бібліотека для роботи з query params
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  React.useEffect(() => {
    const params = {
      ...filters.prices,
      types: Array.from(filters.types),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      // формуємо рядкову строку із значень фільтрів
      arrayFormat: "comma", // рядкова строка через коми для відображення всіх значень в одному полі. %2C - кома в urlencoded форматі
    });

    router.push(`?${query}`, { scroll: false }); // router.push відправляємо рядкову строку в url-адресу !!!, scroll: false - не скролить сторінку на початок
  }, [filters, router]);
};
