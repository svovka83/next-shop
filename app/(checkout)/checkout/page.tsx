"use client";

import React from "react";
import {
  CartCheckoutItem,
  Container,
  FormInput,
  RightCheckoutSide,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSizes, PizzaTypes } from "@/shared/constants/pizzaTypes";
import { getCartItemInfo } from "@/shared/functions";
import { useCart } from "@/shared/hooks";

export default function Checkout() {
  const {
    cartItems,
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    loading,
  } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div>
      <Container className="mt-8">
        <Title
          text="Place an order"
          className="font-extrabold pl-10 text-[32px] mb-4"
        />

        <div className="flex gap-10">
          {/* Left side block of checkout  */}
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <WhiteBlock title="1. Order basket">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
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
            <WhiteBlock title="2. Personal information">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  name="12345"
                  className="text-base"
                  placeholder="FirstName"
                  required
                />
                <Input
                  name="firstName"
                  className="text-base"
                  placeholder="FirstName"
                />
                <Input
                  name="lastName"
                  className="text-base"
                  placeholder="LastName"
                />
                <Input name="email" className="text-base" placeholder="Email" />
                <Input name="phone" className="text-base" placeholder="Phone" />
              </div>
            </WhiteBlock>
            <WhiteBlock title="3. Delivery address">
              <div className="flex flex-col gap-5">
                <Input
                  name="address"
                  className="text-base"
                  placeholder="...input address delivery"
                />
                <Textarea
                  className="text-base"
                  rows={5}
                  placeholder="Comment for order"
                />
              </div>
            </WhiteBlock>
          </div>

          {/* Right side block of checkout  */}
          <div className="w-[450px]">
            <RightCheckoutSide
              cartItems={cartItems}
              totalAmount={totalAmount}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
