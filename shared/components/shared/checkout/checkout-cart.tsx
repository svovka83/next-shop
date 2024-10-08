import React from "react";
import { CartCheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "..";
import { PizzaSizes, PizzaTypes } from "@/shared/constants/pizzaTypes";
import { getCartItemInfo } from "@/shared/functions";
import { CartStateItem } from "@/shared/functions/formation-cart-details";

interface Props {
  cartItems: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({
  cartItems,
  updateItemQuantity,
  removeCartItem,
  loading,
}) => {
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <WhiteBlock title="1. Order basket">
      <div className="flex flex-col gap-4">
        {loading
          ? [...Array(cartItems.length)].map(
              (
                _,
                i // cartItems.length - чимось замінити
              ) => (
                <CheckoutItemSkeleton key={i} /> // розібратись - при перезавантаженні сторінки не відображається скелетони
              )
            )
          : cartItems.map((item) => (
              <div className="mb-2" key={item.id}>
                <CartCheckoutItem
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
    </WhiteBlock>
  );
};
