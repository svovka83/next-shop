import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { CartDTO } from "./dto/cart.dto"; 

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);
  return data;
};
