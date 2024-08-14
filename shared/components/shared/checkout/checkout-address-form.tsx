import React from "react";
import { ErrorText, FormInput, FormTextarea, WhiteBlock } from "..";
import { AddressInput } from "../form/address-input";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = () => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Delivery address">
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="...input address delivery"
        />

        {/* <Controller
          control={control}
          name="address"
          render={({ field, fieldState: { error } }) => (
            <>
              <AddressInput onChangeValue={field.onChange} />
              {error?.message && <ErrorText text={error.message} />}
            </>
          )}
        /> */}

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
