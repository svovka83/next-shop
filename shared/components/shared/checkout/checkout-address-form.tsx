import React from "react";
import { ErrorText, FormInput, FormTextarea, WhiteBlock } from "..";
import { AddressInput } from "../form/address-input";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({
  loading,
  className,
}) => {
  const { control } = useFormContext();

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
