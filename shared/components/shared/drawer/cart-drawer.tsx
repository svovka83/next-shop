"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "..";
import { getCartItemInfo } from "../../../functions";
import { useCartStore } from "@/shared/store";
import { PizzaSizes, PizzaTypes } from "@/shared/constants/pizzaTypes";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const [cartItems, totalAmount, fetchCartItems] = useCartStore((state) => [
    state.cartItems,
    state.totalAmount,
    state.fetchCartItems,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#fff0f0]">
        <SheetHeader>
          <SheetTitle>
            In basket <span>3 goods</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 flex-1 overflow-auto">
          <div className="mb-2">
            {cartItems.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemInfo(
                  item.size as PizzaSizes,
                  item.type as PizzaTypes,
                  item.ingredients
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        <SheetFooter className="-mx-6 p-8 bg-[#c9c9c9]">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-600">
                Total
              </span>
              <span className="font-bold text-lg">{totalAmount} $</span>
            </div>
            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                <b>Make order</b>
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
