import { prisma } from "@/prisma/prisma-client";
import {
  Container,
  GroupVariants,
  CocktailImage,
  Title,
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
      <CocktailImage imageUrl={product.imageUrl} size={30} />

      <div className="w-[450px] bg-[#F5F5F5] p-7 mx-auto">
        <Title text={product.name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">Lorem ipsum dolor sit amet</p>

        <GroupVariants
          items={[
            { name: "Small", value: "1" },
            { name: "Medium", value: "2" },
            { name: "Large", value: "3", disabled: true },
            { name: "Extra Large", value: "4", disabled: true },
          ]}
        />
      </div>
    </Container>
  );
}
