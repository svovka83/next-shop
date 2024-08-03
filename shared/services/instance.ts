import axios from "axios";

// екземпляр для нашого axios
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
