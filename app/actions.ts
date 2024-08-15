// всі серверні екшени в одному файлі

"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrder } from "@/shared/components/shared";
import { CheckoutFormValues } from "@/shared/components/shared/form/checkout-form-schemas";
import {
  createPayment,
  createTestPayment,
  sendEmail,
} from "@/shared/functions";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies(); // в серверних екшинах не має request, тому token витягуємо за допомогою спеціальної функції next.js - cookies()
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Token not found");
    }

    {
      /* находимо корзину по токену */
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        cartItems: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    {
      /* створюємо замовлення */
    }
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems),
      },
    });

    // {
    //   /* обнуляємо загальну суму корзини */
    // }
    // await prisma.cart.update({
    //   where: {
    //     id: userCart.id,
    //   },
    //   data: {
    //     totalAmount: 0,
    //   },
    // });

    // {
    //   /* видаляємо всі елементи з корзини */
    // }
    // await prisma.cartItem.deleteMany({
    //   where: {
    //     cartId: userCart.id,
    //   },
    // });

    {
      /* відправляємо інформацію з даними на payment service */
    }
    // const paymentData = await createPayment({
    //   orderId: order.id,
    //   amount: order.totalAmount,
    //   description: "Order #" + order.id,
    // });
    const paymentData = await createTestPayment({
      // orderId: order.id,
      // amount: order.totalAmount,
      description: "Order #" + order.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    // await prisma.order.update({
    //   where: {
    //     id: order.id,
    //   },
    //   data: {
    //     paymentId: paymentData.id,
    //   },
    // });

    // const paymentUrl = paymentData.confirmation.confirmation_url;
    const paymentUrl = paymentData.description;

    // {
    //   /* відправляємо лист на електронну пошту користувача з посиланням на оплату  */
    // }
    // await sendEmail(
    //   data.email,
    //   `Greeting, pay for your order # ${order.id} now!!!`,
    //   PayOrder({
    //     orderId: order.id,
    //     totalAmount: order.totalAmount,
    //     paymentUrl,
    //   })
    // );

    return paymentUrl; // посилання на оплату
  } catch (error) {
    console.log("[createOrder] Server error:", error);
  }
}
