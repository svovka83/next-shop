"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutFormValues,
  checkoutFormSchema,
} from "@/shared/components/shared/form/checkout-form-schemas";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  Container,
  RightCheckoutSide,
  Title,
} from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";

export default function Checkout() {
  const {
    cartItems,
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    loading,
  } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <Container className="mt-8">
        <Title
          text="Place an order"
          className="font-extrabold pl-10 text-[32px] mb-4"
        />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-10">
              {/* Left side block of checkout  */}
              <div className="flex flex-col gap-10 flex-1 mb-20">
                <CheckoutCart
                  cartItems={cartItems}
                  updateItemQuantity={updateItemQuantity}
                  removeCartItem={removeCartItem}
                />

                <CheckoutPersonalForm />

                <CheckoutAddressForm />
              </div>

              {/* Right side block of checkout  */}
              <div className="w-[450px]">
                <RightCheckoutSide
                  cartItems={cartItems}
                  totalAmount={totalAmount}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </Container>
    </div>
  );
}
