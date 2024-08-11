"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "../../ui/dialog";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const firstItem = product.variants[0];
  const isPizzaForm = Boolean(firstItem.type);

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success("Pizza added to your cart", { duration: 4000 });
      router.back();
    } catch (err) {
      toast.error("Can't add pizza to your cart");
      console.error(err);
    }
  };
  const onAddProduct = () => {
    try {
      addCartItem({
        productItemId: firstItem.id,
        ingredients: [],
      });
      toast.success(product.name + " added to your cart", { duration: 4000 });
      router.back();
    } catch (err) {
      toast.error("Can't add product to your cart");
      console.error(err);
    }
  };

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
            onSubmit={onAddPizza}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onAddProduct}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
