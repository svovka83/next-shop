"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { useCategoryStore } from "@/store/category";

interface Props {
  className?: string;
}

export const races = [
  { id: 1, name: "Fresh" },
  { id: 2, name: "Chocolate" },
  { id: 3, name: "Fruits" },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {races.map(({ id, name }, index) => (
        <a
          className={cn(
            "flex items-center font-bold h-9 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
