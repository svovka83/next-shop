import React from "react";
import qs from "qs"; // бібліотека для роботи з query params
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

    React.useEffect(() => {
        const params = {
          ...filters.prices,
          strengths: Array.from(filters.strengths),
          sizes: Array.from(filters.sizes),
          ingredients: Array.from(filters.selectedIngredients),
        };
    
        const query = qs.stringify(params, {
          // формуємо query params для url-адреси
          arrayFormat: "comma", // використовуємо масив з комами для відображення всіх значень
        });
    
        router.push(`?${query}`, { scroll: false }); // router.push відправляємо query params в url-адресу !!!, scroll: false - не скролить сторінку на початок
      }, [ filters, router ]);
}