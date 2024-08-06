import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const catagories = await prisma.category.findMany({
    include: {
      products: {
        // відображення продуктів в категоріях
        include: {
          variants: true, // відображення списків продуктів в категоріях
          ingredients: true, // відображення інгредієнтів
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-8">
        <Title text="All assortment" size="lg" className="font-extrabold pl-10" />
      </Container>
      <TopBar categories={catagories.filter((c) => c.products.length > 0)} />
      <Container className="mt-8 pb-14 ">
        <div className="flex gap-[60px]">
          {/* filtration */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* list products */}
          <div className="flex-1">
            <div className="flex flex-col">
              {catagories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      itemsProduct={category.products} // список продуктів в категорії
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
