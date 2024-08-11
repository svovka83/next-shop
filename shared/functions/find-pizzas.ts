import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  types?: string;
  ingredients?: string;
  priceFrom?: number;
  priceTo?: number;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const types = params.types?.split(",").map(Number);
  const ingredientsIdArray = params.ingredients?.split(",").map(Number);

  const minPrice = Number(params.priceFrom || DEFAULT_MIN_PRICE);
  const maxPrice = Number(params.priceTo || DEFAULT_MAX_PRICE);

  const catagories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "asc",
        },
        where: {
          ingredients: ingredientsIdArray
            ? { some: { id: { in: ingredientsIdArray } } }
            : undefined,
          variants: {
            some: {
              size: {
                in: sizes,
              },
              type: {
                in: types,
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          variants: {
            orderBy: {
              price: "asc",
            },
            where: {
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
          ingredients: true,
        },
      },
    },
  });
  return catagories;
};
