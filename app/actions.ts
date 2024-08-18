// всі серверні екшени в одному файлі

"use server";

import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { PayOrder, VerificationUser } from "@/shared/components/shared";
import { CheckoutFormValues } from "@/shared/components/shared/form/checkout-form-schemas";
import { createPayment, sendEmail } from "@/shared/functions";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

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

    {
      /* обнуляємо загальну суму корзини */
    }
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    {
      /* видаляємо всі елементи з корзини */
    }
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    {
      /* відправляємо інформацію з даними на payment service */
    }
    const paymentData = await createPayment({
      // доробити інтерфейс PaymentData під даними замовлення !!!!!
      orderId: order.id,
      amount: order.totalAmount,
      description: "Order #" + order.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
        status: paymentData.status,
      },
    });

    // const paymentUrl = paymentData.confirmation.confirmation_url;
    const paymentUrl = paymentData.url;

    {
      /* відправляємо лист на електронну пошту користувача з посиланням на оплату  */
    }
    await sendEmail(
      data.email,
      `Greeting, pay for your order # ${order.id} now!!!`,
      PayOrder({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl; // посилання на оплату
  } catch (error) {
    console.log("[createOrder] Server error:", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getServerSession(authOptions);

    if (!currentUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.user.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    });
  } catch (error) {
    console.log("Error [UPDATE_USER]", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Mail is not confirmed");
      }

      throw new Error("User already exists");
    }

    const createUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id,
      },
    })

    await sendEmail(
      createUser.email,
      "Greeting, confirm your registration account",
      VerificationUser({
        code
      })
    );

  } catch (error) {
    console.log("Error [CREATE_USER]", error);
    throw error;
  }
}
