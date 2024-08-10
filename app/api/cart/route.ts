import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/functions";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, cartItems: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        cartItems: {
          orderBy: {
            createdAt: "desc",
          },
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

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[GET_CART]", error);
    return NextResponse.json({ message: "Cannot get cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    // чи є додаваємий товар в корзині ?
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients,
            },
          },
        },
      },
    });

    // якщо є, то збільшуємо кількість на 1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });

      const updatedUserCart = await updateCartTotalAmount(token);
      const response = NextResponse.json(updatedUserCart);
      response.cookies.set("cartToken", token);
      return response;

      // якщо немає, то створюємо новий
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            connect: data.ingredients.map((id) => ({ id })),
          },
        },
      });

      const updatedUserCart = await updateCartTotalAmount(token);
      const response = NextResponse.json(updatedUserCart);
      response.cookies.set("cartToken", token);
      return response;
    }
  } catch (error) {
    console.log("[POST_CART]", error);
    return NextResponse.json(
      { message: "Something went wrong. Cannot create cart" },
      { status: 500 }
    );
  }
}
