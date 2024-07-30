import React from "react";
import { useSet } from "react-use";

import { Api } from "@/services/api-client";

import { Ingredient } from "@prisma/client";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>; // множина вибраних інгредієнтів
  onAddId: (id: string) => void; // функція для додавання елемента до множини
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([])); // хук для управління множиной вибраних інгредієнтів, toggle вміє додавати і видаляти елементи з множини

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIds };
};
