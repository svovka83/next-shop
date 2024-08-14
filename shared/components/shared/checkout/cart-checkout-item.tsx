import React from "react";
import { cn } from "@/lib/utils";
import * as CartItem from "../cart-item-details";
import { CartItemProps } from "../cart-item-details/cart-item.types";
import { Trash2 } from "lucide-react";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartCheckoutItem: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-50 pointer-events-none": disabled }, // check this disabled if need here it ???
        className
      )}
    >
      <div className="flex flex-1 items-center gap-6">
        <CartItem.Image imageUrl={imageUrl} />
        <CartItem.Info name={name} details={details} className="text-sm" />
      </div>

      <CartItem.Price price={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.Button
          quantity={quantity}
          onClickCountButton={onClickCountButton}
        />
        <div className="flex items-center gap-3">
          <Trash2
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={16}
            onClick={onClickRemove}
          />
        </div>
      </div>
    </div>
  );
};
