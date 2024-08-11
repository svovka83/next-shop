import { prisma } from "@/prisma/prisma-client";
import {
  Container,
  GroupVariants,
  Title,
  PizzaImage,
} from "@/shared/components/shared";
import { notFound } from "next/navigation"; // для відображення сторінки 404

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="grid grid-cols-2 py-14">
      <PizzaImage imageUrl={product.imageUrl} size={10} />

      <div className="w-[450px] bg-[#F5F5F5] p-7 mx-auto">
        <Title text={product.name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">More information about the product</p>

        <GroupVariants
          variants={[
            { name: "small", value: "10" },
            { name: "medium", value: "20" },
            { name: "big", value: "30", disabled: true },
            { name: "extra big", value: "40", disabled: true },
          ]}
        />
      </div>
    </Container>
  );
}
