"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import { useCategoryStore } from "@/shared/store/category";

interface Props {
  categories: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({categories, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({ id, name }, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-9 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
          href={`/#${name}`} // перехід на позицію з назвою категорії
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
