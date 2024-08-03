import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";

export const metadata: Metadata = {
  title: "Cocktail Shop",
  description: "Cocktail shop for all family",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {modal}
      {children}
    </main>
  );
}
