import React from "react";
import { Api } from "../services/api-client";
import { Ingredient } from "@prisma/client";

/**
 * хук для отримання з сервера та зберігання в стейті компонента списку інгредієнтів та зберігання позиції стану завантаження
 *
 * @returns - ingredients, loading
 */
export const useFilterIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // в useEffect щоб зробити async-await використовуємо "дурацьку" функцію fetchIngredients і викликаємо її
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

  return {
    ingredients,
    loading,
  };
};
