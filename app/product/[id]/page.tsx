import { Container, ProductImage, Title } from "@/components/shared";
import { Button } from "@/components/ui";
import { prisma } from "@/prisma/prisma-client";
import { Plus } from "lucide-react";
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
    <Container className="flex my-28">
      <ProductImage imageUrl={product.imageUrl} size={20} className="" />

      <div className="w-[490px] bg-[#F5F5F5] p-7">
        <Title text={product.name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">Lorem ipsum dolor sit amet</p>

        {/* <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">Price: {textDetaills} $</span>
            <Button variant="outline" className="text-base font-bold">
              <Plus size={20} />
              Add
            </Button>
          </div> */}
      </div>
    </Container>
  );
}
