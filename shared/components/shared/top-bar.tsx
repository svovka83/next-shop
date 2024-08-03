import React from "react";
import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import { Categories, Container, SortPopup } from ".";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-3 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-around">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
