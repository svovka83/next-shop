import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Cart } from "@prisma/client"; // автоматично згенерований тип за допомогою prisma

export const fetchCart = async (): Promise<Cart> => {
  const { data } = await axiosInstance.get<Cart>(ApiRoutes.CART);
  return data;
};
