import { axiosInstance } from "../services/instance";
import { PaymentTestData } from "@/@types/payment-service";

// /api/payment/service - here must endpoint of payment service

interface Props {
  // orderId: number;
  // amount: number;
  description: string;
}

export async function createTestPayment(details: Props) {
  const { data } = await axiosInstance.post<PaymentTestData>(
    "/payment/service",
    {
      // amount: { value: details.amount, currency: "USD" },
      // capture: true,
      // metadata: {
      //   order_id: details.orderId,
      // },
      // confirmation: {
      //   type: "redirect",
      //   return_url: process.env.PAYMENT_SERVICE_CALLBACK_URL,
      // },
      description: details.description,
    }
    // {
    //   auth: {
    //     username: "admin" || process.env.PAYMENT_SERVICE_USERNAME,
    //     password: "",
    //   },
    //   headers: {
    //     "Idempotence-Key": Math.random().toString(36),
    //   },
    // }
  );

  return data;
}
