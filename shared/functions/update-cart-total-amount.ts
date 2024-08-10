import { prisma } from "@/prisma/prisma-client";
import { calcCartItemTotalPrice } from ".";

export const updateCartTotalAmount = async (token: string) => {
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

  if (!userCart) {
    return 0;
  }

  const totalAmount = userCart.cartItems.reduce(
    (acc, item) =>
      acc +
      calcCartItemTotalPrice(
        item.productItem.price,
        item.quantity,
        item.ingredients.map((ingredient) => ingredient.price)
      ),
    0
  );

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
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
};
