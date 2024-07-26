import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All races" size="lg" className="font-extrabold pl-10" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14 ">
        <div className="flex gap-[60px]">
          {/* filtration */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* list products */}
          <div className="flex-1">
            <div className="flex flex-col px-4">
              <ProductsGroupList
                title="Zerg"
                items={[
                  {
                    id: 1,
                    name: "zerling",
                    imageURL: "",
                    price: 1,
                  },
                  {
                    id: 2,
                    name: "gidralisk",
                    imageURL: "",
                    price: 2,
                  },
                  {
                    id: 3,
                    name: "mutalisk",
                    imageURL: "",
                    price: 3,
                  },
                  {
                    id: 4,
                    name: "ultralisk",
                    imageURL: "",
                    price: 6,
                  },
                ]}
                categoryId={1}
                listClassName=""
                className=""
              />
              <ProductsGroupList
                title="Terran"
                items={[
                  {
                    id: 1,
                    name: "zerling",
                    imageURL: "",
                    price: 1,
                  },
                  {
                    id: 2,
                    name: "gidralisk",
                    imageURL: "",
                    price: 2,
                  },
                  {
                    id: 3,
                    name: "mutalisk",
                    imageURL: "",
                    price: 3,
                  },
                  {
                    id: 4,
                    name: "ultralisk",
                    imageURL: "",
                    price: 6,
                  },
                ]}
                categoryId={2}
                listClassName=""
                className=""
              />
              <ProductsGroupList
                title="Protoss"
                items={[
                  {
                    id: 1,
                    name: "zerling",
                    imageURL: "",
                    price: 1,
                  },
                  {
                    id: 2,
                    name: "gidralisk",
                    imageURL: "",
                    price: 2,
                  },
                  {
                    id: 3,
                    name: "mutalisk",
                    imageURL: "",
                    price: 3,
                  },
                  {
                    id: 4,
                    name: "ultralisk",
                    imageURL: "",
                    price: 6,
                  },
                ]}
                categoryId={3}
                listClassName=""
                className=""
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
