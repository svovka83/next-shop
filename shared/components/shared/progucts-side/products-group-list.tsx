"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { ProductCard, Title } from "..";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

export interface Props {
  title: string;
  itemProducts: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  itemProducts,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null); 
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.3,
  }); // хук для перевірки чи є елемент в зоні видимості

  React.useEffect(() => {
    if (intersection?.isIntersecting) { 
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold my-5 ml-3" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {itemProducts.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price} // ціна продукту першої варіації продукту
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
