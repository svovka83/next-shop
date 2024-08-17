import React from "react";
import { FormInput, FormTextarea, WhiteBlock } from "..";
import { cn } from "@/lib/utils";

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({
  loading,
  className,
}) => {
  return (
    <WhiteBlock
      title="3. Delivery address"
      className={cn("", loading && className)}
    >
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="...input address delivery"
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Comment for order"
          rows={10} // не використовується ???
        />
      </div>
    </WhiteBlock>
  );
};
