import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation"; // для відображення сторінки 404
import {
  Container,
  GroupVariants,
  ProductImage,
  Title,
} from "@/components/shared";

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
      <ProductImage imageUrl={product.imageUrl} size={30} className="" />

      <div className="w-[400px] bg-[#F5F5F5] p-7 mx-auto">
        <Title text={product.name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">Lorem ipsum dolor sit amet</p>

        <GroupVariants
          selectedValue="2"
          items={[
            { name: "Small", value: "1" },
            { name: "Medium", value: "2" },
            { name: "Large", value: "3", disabled: true },
          ]}
        />
      </div>
    </Container>
  );
}
