import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query, // пошук по назві продукту в будь-якому місці назви
        mode: "insensitive", // чуттєвість до регістру - "insensitive" немає чуттєвості до регістру
      },
    },
    take: 5, // кількість повернених продуктів
  });

  return NextResponse.json(products);
}
