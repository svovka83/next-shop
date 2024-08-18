import { Suspense } from "react";
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
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
