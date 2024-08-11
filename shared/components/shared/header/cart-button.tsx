"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "..";
import { useCartStore } from "@/shared/store";

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, cartItems, loading] = useCartStore((state) => [
    state.totalAmount,
    state.cartItems,
    state.loading,
  ]);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        variant="default"
        className={cn("group relative", { "w-[131px]": loading }, className)}
      >
        <b>{totalAmount} $</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size="16px" className="relative" strokeWidth={2} />
          <b>{cartItems.length}</b>
        </div>
        <ArrowRight
          size="20px"
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
