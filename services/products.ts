import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

import { Product } from "@prisma/client"; // автоматично згенерований тип за допомогою prisma

// метод для пошуку продуктів через query params
export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: {
        query,
      },
    }
  );

  return data;
};
