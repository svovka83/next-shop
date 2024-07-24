import { Container, Filters, Title, TopBar } from "@/components/shared";

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
            <div className="flex flex-col gap-[16px]">List product</div>
          </div>
        </div>
      </Container>
    </>
  );
}
