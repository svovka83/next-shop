import React from "react";
import { CheckoutLineInfo, WhiteBlock } from "..";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../../ui";
import { CartStateItem } from "@/shared/functions/formation-cart-details";

interface Props {
  cartItems: CartStateItem[];
  totalAmount: number;
  className?: string;
}

export const RightCheckoutSide: React.FC<Props> = ({
  cartItems,
  totalAmount,
}) => {
  const DELIVERY_PRICE = 100;
  const TAX_PERCENT = 15;
  const TAX_COUNT = Math.floor(totalAmount * TAX_PERCENT) / 100;
  const DELIVERY_COUNT =
    cartItems.length * 20 +
    cartItems
      .map((item) => item.quantity)
      .reduce((acc, quan) => acc + quan, 0) *
      10 +
    DELIVERY_PRICE;
  const TOTAL_PRICE = totalAmount + TAX_COUNT + DELIVERY_COUNT;

  return (
    <WhiteBlock className="sticky top-4 p-6">
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-xl">Total price:</span>
        <span className="text-[34px] font-extrabold">
          {cartItems.length > 0 ? TOTAL_PRICE : 0} $
        </span>
      </div>
      <div className="border-t border-gray-100 py-3">
        <CheckoutLineInfo
          titleInfo={
            <div className="flex items-center">
              <Package className="mr-3 text-gray-300" />
              Price:
            </div>
          }
          price={totalAmount}
        />
        <CheckoutLineInfo
          titleInfo={
            <div className="flex items-center">
              <Percent className="mr-3 text-gray-300" />
              Taxes:
            </div>
          }
          price={TAX_COUNT}
        />
        <CheckoutLineInfo
          titleInfo={
            <div className="flex items-center">
              <Truck className="mr-3 text-gray-300" />
              Delivery:
            </div>
          }
          price={cartItems.length > 0 ? DELIVERY_COUNT : 0}
        />
      </div>

      <Button type="submit" className="w-full text-[18px] group" size="lg">
        Go to payment
        <ArrowRight
          size="20px"
          className="ml-3 group-hover:translate-x-2 transition"
        />
      </Button>
    </WhiteBlock>
  );
};
