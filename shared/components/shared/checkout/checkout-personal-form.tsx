import React from "react";
import { cn } from "@/lib/utils";
import { FormInput, WhiteBlock } from "..";

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({
  loading,
  className,
}) => {
  return (
    <WhiteBlock
      title="2. Personal information"
      className={cn("", loading && className)}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="FirstName"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="LastName"
        />
        <FormInput name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
        {/* бібліотека react-imask - для форматування номера (тут не використовується, можна в майбутньому додати ) */}
      </div>
    </WhiteBlock>
  );
};
