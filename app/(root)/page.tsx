import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
  Stories,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas } from "@/shared/functions";
import { GetSearchParams } from "@/shared/functions/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const catagories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-8">
        <Title
          text="All assortment"
          size="lg"
          className="font-extrabold pl-10"
        />
      </Container>

      {/* <Stories /> */}

      <TopBar
        categories={catagories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className="mt-8 pb-14 ">
        <div className="flex gap-[60px]">
          {/* filtration */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
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
                      itemProducts={category.products} // список продуктів в категорії
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
