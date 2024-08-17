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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function Checkout() {
  const [submitting, setSubmitting] = React.useState(false);

  const {
    cartItems,
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    loading,
  } = useCart();

  const { data: session } = useSession();

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

  React.useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await Api.auth.getMe();
      const [firstName, lastName] = userInfo.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", userInfo.email);
    }

    if (!session) {
      fetchUserInfo();
    }
  }, []);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      if (!window.confirm("Are you sure go to payment")) return;
      setSubmitting(true);

      const url = await createOrder(data);

      toast.success("Order created successfully. Redirect to payment...", {
        duration: 4000,
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error("Something went wrong", { duration: 4000, icon: "❌" });
    }
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
                  loading={loading}
                />

                <CheckoutPersonalForm
                  loading={loading}
                  className="opacity-45 pointer-events-none"
                />

                <CheckoutAddressForm
                  loading={loading}
                  className="opacity-45 pointer-events-none"
                />
              </div>

              {/* Right side block of checkout  */}
              <div className="w-[450px]">
                <RightCheckoutSide
                  cartItems={cartItems}
                  totalAmount={totalAmount}
                  loading={loading || submitting}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </Container>
    </div>
  );
}
