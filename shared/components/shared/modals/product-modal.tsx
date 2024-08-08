"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "../../ui/dialog";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.ingredients[0]);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      {/* відображається коли присутній product, router.back() - повернення на попередню сторінку */}
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            variants={product.variants}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
