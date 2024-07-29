import axiosInstance from "axios";

import { Product } from "@prisma/client";

{/* метод для пошуку продуктів */}
export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product>("/products/search", {
    params: {
      query,
    },
  });

  return data;
};
