"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from ".";
import { getCartItemDetails } from "@/shared/lib";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
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
            <CartDrawerItem
              id={0}
              imageUrl={
                "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0"
              }
              details={getCartItemDetails(25, 2, [
                { name: "Cheese" },
                { name: "Cucumber" },
                { name: "Mushrooms" },
                { name: "Bacon" },
              ])}
              name={"Cheese Fresh Crispy Cocktail"}
              price={419}
              quantity={1}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 p-8 bg-[#c9c9c9]">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-600">
                Total
              </span>
              <span className="font-bold text-lg">100 $</span>
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
