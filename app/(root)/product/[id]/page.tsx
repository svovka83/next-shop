import { prisma } from "@/prisma/prisma-client";
import { ChooseForm, Container } from "@/shared/components/shared";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      variants: {
        orderBy: {
          createdAt: "desc",
        },
      },
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container>
      <ChooseForm product={product} />
    </Container>
  );
}
