"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseCocktailForm, ChooseProductForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "../../ui/dialog";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isCocktailForm = Boolean(product.ingredients[0]);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      {/* router.back() - повернення на попередню сторінку */}
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isCocktailForm ? (
          <ChooseCocktailForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
