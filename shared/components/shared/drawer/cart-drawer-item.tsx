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

export const CartDrawerItem: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItem.Image imageUrl={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.Button quantity={quantity} onClickCountButton={onClickCountButton} />

          <div className="flex items-center gap-3">
            <CartItem.Price price={price} />
            <Trash2
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
