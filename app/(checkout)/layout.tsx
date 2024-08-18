import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food shop | Checkout",
  description: "This is checkout for food shop for make order",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#fff0f0]">
      <Container>
        <Header hasSearch={false} hasCart={false} className="border-gray-200" />
        {children}
      </Container>
    </main>
  );
}
