import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const catagories = await prisma.category.findMany({
    include: {
      products: {
        // відображення продуктів в категоріях
        include: {
          items: true, // відображення списків продуктів в категоріях
          ingredients: true, // відображення інгредієнтів
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title
          text="All cocktails"
          size="lg"
          className="font-extrabold pl-10"
        />
      </Container>
      <TopBar />
      <Container className="mt-8 pb-14 ">
        <div className="flex gap-[60px]">
          {/* filtration */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* list products */}
          <div className="flex-1">
            <div className="flex flex-col px-4">
              {catagories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
