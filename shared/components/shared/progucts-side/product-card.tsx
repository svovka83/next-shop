"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from "..";
import { Plus } from "lucide-react";
import { Button } from "../../ui";
import { Ingredient } from "@prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  ingredients: Ingredient[];
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  ingredients,
  imageUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-[260px] rounded-2xl shadow bg-secondary hover:shadow-2xl hover:-translate-y-2 duration-300 mx-auto",
        className
      )}
    >
      <Link href={`/product/${id}`}>
        <div className="flex flex-col p-[25px]">
          <img
            className="w-[210px] h-[210px] bg-white rounded-2xl p-8"
            src={imageUrl}
            alt={name}
          />

          <Title text={name} size="sm" className="mb-1 mt-2 font-bold" />

          <p className="flex flex-wrap text-sm text-gray-400">
            {ingredients.map((ingredient) => ingredient.name).join(", ")}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-[16px] font-bold">from: {price} $</span>
            <Button variant="outline" className="text-base font-bold">
              <Plus size={20} />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};
