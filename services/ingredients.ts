import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

import { Ingredient } from "@prisma/client"; // автоматично згенерований тип за допомогою prisma

// метод для запиту всіх інгредієнтів
export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
