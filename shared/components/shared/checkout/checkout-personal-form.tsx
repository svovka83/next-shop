import React from "react";
import { FormInput, WhiteBlock } from "..";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = () => {
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      comment: "",
    },
  });

  return (
    <WhiteBlock title="2. Personal information">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="12345"
          className="text-base"
          placeholder="FirstName"
          required
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="LastName"
        />
        <FormInput name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
