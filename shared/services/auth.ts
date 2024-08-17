import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { User } from "@prisma/client";

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>(ApiRoutes.AUTH_ME);
  return data;
};
