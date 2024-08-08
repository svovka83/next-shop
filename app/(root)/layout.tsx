import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";

export const metadata: Metadata = {
  title: "Food Shop",
  description: "Food shop for all family",
};

export default function HomeLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {modal}
      {children}
    </main>
  );
}
