import React from "react";
import { FormInput, FormTextarea, WhiteBlock } from "..";
import { Input, Textarea } from "../../ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = () => {
  return (
    <WhiteBlock title="3. Delivery address">
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="...input address delivery"
        />
        <FormTextarea
          name="comment"
          className="text-base"
          aria-rowspan={10}
          placeholder="Comment for order"
        />
      </div>
    </WhiteBlock>
  );
};
