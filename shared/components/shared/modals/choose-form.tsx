"use client";

import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "..";

interface Props {
  product: ProductWithRelations;
  closeModal?: () => void;
  className?: string;
}

export const ChooseForm: React.FC<Props> = ({ product, closeModal }) => {
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
      closeModal?.();
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
      closeModal?.();
    } catch (err) {
      toast.error("Can't add product to your cart");
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        variants={product.variants}
        ingredients={product.ingredients}
        onSubmit={onAddPizza}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onAddProduct}
      loading={loading}
    />
  );
};
