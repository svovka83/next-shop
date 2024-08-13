import React from "react";
import { WhiteBlock } from "..";
import { Input, Textarea } from "../../ui";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = () => {
  return (
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
  );
};
