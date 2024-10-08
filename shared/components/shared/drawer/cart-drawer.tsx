"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem, Title } from "..";
import { getCartItemInfo } from "../../../functions";
import { PizzaSizes, PizzaTypes } from "@/shared/constants/pizzaTypes";
import { useCart } from "@/shared/hooks";

interface Props {
  children: React.ReactNode;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { cartItems, totalAmount, updateItemQuantity, removeCartItem } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#fff0f0]">
        {totalAmount > 0 && (
          <SheetHeader>
            <SheetTitle>
              <span>In basket {cartItems.length} goods</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!totalAmount && (
          <div className="flex flex-col items-center justify-center w-72 m-auto">
            <Image
              src="/assets/images/empty-box.png"
              alt="empty-cart"
              width={120}
              height={120}
            />
            <Title
              text="Cart is empty"
              size="lg"
              className="text-center font-bold mt-2"
            />
            <p className="text-center text-neutral-500 mb-2">
              Add something to cart for make your order, please
            </p>
            <SheetClose>
              <Button className="w-56 h-12 text-base group" size="lg">
                <ArrowLeft className="w-8 h-5 group-hover:-translate-x-1 transition" />
                Back
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className="-mx-6 flex-1 overflow-auto">
              {cartItems.map((item) => (
                <div className="mb-2" key={item.id}>
                  <CartDrawerItem
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
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemove={() => removeCartItem(item.id)}
                    disabled={item.disabled}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="-mx-6 p-8 bg-[#c9c9c9]">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-600">
                    Total
                  </span>
                  <span className="font-bold text-lg">{totalAmount} $</span>
                </div>
                <Link href="/checkout">
                  <Button type="submit" className="w-full h-12 text-base group">
                    <b>Make order</b>
                    <ArrowRight className="w-5 ml-2 group-hover:translate-x-2 transition" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
